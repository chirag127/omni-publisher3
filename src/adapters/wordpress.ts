import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

export const wordpress: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const site = process.env.WP_SITE; // e.g., https://example.com
        const username = process.env.WP_USERNAME;
        const password = process.env.WP_ACCESS_TOKEN; // Application Password

        if (!site || !username || !password) {
            throw new Error(
                "WP_SITE, WP_USERNAME, or WP_ACCESS_TOKEN is missing"
            );
        }

        const auth = Buffer.from(`${username}:${password}`).toString("base64");
        const apiUrl = `${site}/wp-json/wp/v2/posts`;

        const payload = {
            title: post.attributes.title,
            content: post.html, // WP prefers HTML
            status: "publish",
            // tags: ... need to map tags to IDs in WP, skipping for MVP
        };

        try {
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                },
            });

            return {
                id: response.data.id.toString(),
                url: response.data.link,
            };
        } catch (error: any) {
            logger.error(
                "WordPress publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
