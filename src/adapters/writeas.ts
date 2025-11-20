import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://write.as/api/posts";

export const writeas: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const token = process.env.WRITEAS_API_TOKEN;

        if (!token) {
            throw new Error("WRITEAS_API_TOKEN is missing");
        }

        const payload = {
            title: post.attributes.title,
            body: post.body, // Write.as accepts Markdown
            // collection: 'alias' // Optional: if publishing to a specific blog
        };

        try {
            const response = await axios.post(API_URL, payload, {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data.data;

            return {
                id: data.id,
                url: `https://write.as/${data.id}`, // Or data.url if provided
            };
        } catch (error: any) {
            logger.error(
                "Write.as publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
