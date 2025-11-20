import { google } from "googleapis";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

export const blogger: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const clientId = process.env.BLOGGER_CLIENT_ID;
        const clientSecret = process.env.BLOGGER_CLIENT_SECRET;
        const refreshToken = process.env.BLOGGER_REFRESH_TOKEN;
        const blogId = process.env.BLOGGER_BLOG_ID;

        if (!clientId || !clientSecret || !refreshToken || !blogId) {
            throw new Error(
                "Blogger credentials missing (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, BLOG_ID)"
            );
        }

        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const bloggerApi = google.blogger({
            version: "v3",
            auth: oauth2Client,
        });

        try {
            const res = await bloggerApi.posts.insert({
                blogId: blogId,
                requestBody: {
                    title: post.attributes.title,
                    content: post.html, // Blogger uses HTML
                    labels: post.attributes.tags,
                },
            });

            if (!res.data.id || !res.data.url) {
                throw new Error("Blogger API did not return ID or URL");
            }

            return {
                id: res.data.id,
                url: res.data.url,
            };
        } catch (error: any) {
            logger.error("Blogger publish error", error.message);
            throw error;
        }
    },
};
