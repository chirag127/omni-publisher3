import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://api.telegra.ph/createPage";

export const telegraph: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const accessToken = process.env.TELEGRAPH_ACCESS_TOKEN;

        if (!accessToken) {
            throw new Error("TELEGRAPH_ACCESS_TOKEN is missing");
        }

        // Telegraph requires content in a Node format (Array of Elements).
        // For MVP, we'll do a very simple conversion: one paragraph node with the full text.
        // A proper implementation would parse Markdown to Telegraph Nodes.
        const content = [
            {
                tag: "p",
                children: [post.body], // This will treat markdown as plain text mostly, but it's a start
            },
        ];

        const payload = {
            access_token: accessToken,
            title: post.attributes.title,
            content: JSON.stringify(content),
            return_content: false,
        };

        try {
            const response = await axios.post(API_URL, payload);

            if (!response.data.ok) {
                throw new Error(response.data.error || "Telegraph API error");
            }

            const result = response.data.result;

            return {
                id: result.path, // path is the ID effectively
                url: result.url,
            };
        } catch (error: any) {
            logger.error(
                "Telegraph publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
