import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const BASE_URL = "https://api.medium.com/v1";

export const medium: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const token = process.env.MEDIUM_INTEGRATION_TOKEN;
        let userId = process.env.MEDIUM_USER_ID;

        if (!token) {
            throw new Error("MEDIUM_INTEGRATION_TOKEN is missing");
        }

        // If userId is not provided, fetch it
        if (!userId) {
            try {
                const userResponse = await axios.get(`${BASE_URL}/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                userId = userResponse.data.data.id;
            } catch (error: any) {
                logger.error(
                    "Failed to fetch Medium User ID",
                    error.response?.data || error.message
                );
                throw error;
            }
        }

        const payload = {
            title: post.attributes.title,
            contentFormat: "markdown",
            content: post.body,
            tags: post.attributes.tags,
            publishStatus: "public", // or 'draft'
        };

        try {
            const response = await axios.post(
                `${BASE_URL}/users/${userId}/posts`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return {
                id: response.data.data.id,
                url: response.data.data.url,
            };
        } catch (error: any) {
            logger.error(
                "Medium publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
