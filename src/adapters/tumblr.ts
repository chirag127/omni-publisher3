import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

export const tumblr: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const consumerKey = process.env.TUMBLR_CONSUMER_KEY;
        const consumerSecret = process.env.TUMBLR_CONSUMER_SECRET;
        const token = process.env.TUMBLR_TOKEN;
        const tokenSecret = process.env.TUMBLR_TOKEN_SECRET;
        const blogIdentifier = process.env.TUMBLR_BLOG_IDENTIFIER; // e.g., myblog.tumblr.com

        if (
            !consumerKey ||
            !consumerSecret ||
            !token ||
            !tokenSecret ||
            !blogIdentifier
        ) {
            throw new Error("Tumblr credentials missing");
        }

        const oauth = new OAuth({
            consumer: { key: consumerKey, secret: consumerSecret },
            signature_method: "HMAC-SHA1",
            hash_function(base_string, key) {
                return crypto
                    .createHmac("sha1", key)
                    .update(base_string)
                    .digest("base64");
            },
        });

        const url = `https://api.tumblr.com/v2/blog/${blogIdentifier}/post`;
        const requestData = {
            url: url,
            method: "POST",
            data: {
                type: "text",
                title: post.attributes.title,
                body: post.html, // Tumblr text posts accept HTML
                tags: post.attributes.tags.join(","),
                state: "published",
            },
        };

        const headers = oauth.toHeader(
            oauth.authorize(requestData, { key: token, secret: tokenSecret })
        );

        try {
            // Note: axios sends JSON by default, but OAuth 1.0a usually signs form-urlencoded data.
            // However, Tumblr API v2 supports JSON if signed correctly or form-urlencoded.
            // For simplicity with OAuth 1.0a libraries, form-urlencoded is often safer.
            // Let's use URLSearchParams to ensure form-urlencoded.
            const params = new URLSearchParams();
            params.append("type", "text");
            params.append("title", post.attributes.title);
            params.append("body", post.html);
            params.append("tags", post.attributes.tags.join(","));
            params.append("state", "published");

            const response = await axios.post(url, params, {
                headers: {
                    ...headers,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const data = response.data.response;
            // Tumblr create post response usually contains 'id' but not full URL.
            // We construct URL manually: https://{blogIdentifier}/post/{id}
            const id = data.id;
            const postUrl = `https://${blogIdentifier}/post/${id}`;

            return {
                id: id.toString(),
                url: postUrl,
            };
        } catch (error: any) {
            logger.error(
                "Tumblr publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
