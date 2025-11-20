import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://dev.to/api/articles";

export const devto: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const apiKey = process.env.DEVTO_API_KEY;
        if (!apiKey) {
            throw new Error("DEVTO_API_KEY is missing");
        }

        const payload = {
            article: {
                title: post.attributes.title,
                body_markdown: post.body,
                published: true, // Set to false if you want drafts
                tags: post.attributes.tags,
                description: post.attributes.description,
            },
        };

        try {
            const response = await axios.post(API_URL, payload, {
                headers: {
                    "api-key": apiKey,
                    "Content-Type": "application/json",
                },
            });

            return {
                id: response.data.id.toString(),
                url: response.data.url,
            };
        } catch (error: any) {
            logger.error(
                "Dev.to publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
