import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://micro.blog/micropub";

export const microblog: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const token = process.env.MICROBLOG_TOKEN;

        if (!token) {
            throw new Error("MICROBLOG_TOKEN is missing");
        }

        // Micropub format
        const params = new URLSearchParams();
        params.append("h", "entry");
        params.append("name", post.attributes.title);
        params.append("content", post.body); // Micro.blog handles Markdown
        // params.append('category[]', ...);

        try {
            const response = await axios.post(API_URL, params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            // Micropub returns Location header on success
            const location = response.headers["location"];
            if (!location) {
                throw new Error("Micro.blog did not return Location header");
            }

            return {
                id: location, // Using URL as ID since Micropub doesn't always return a separate ID
                url: location,
            };
        } catch (error: any) {
            logger.error(
                "Micro.blog publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
