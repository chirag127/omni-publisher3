import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://www.wixapis.com/blog/v3/draft-posts";

export const wix: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const token = process.env.WIX_API_TOKEN;
        const memberId = process.env.WIX_MEMBER_ID; // Required for 3rd party apps

        if (!token) {
            throw new Error("WIX_API_TOKEN is missing");
        }

        // Wix Rich Content (Ricos) structure is complex.
        // For MVP, we will try to pass a simplified structure or just text if possible.
        // Research showed Ricos JSON is required.
        // Constructing a minimal valid Ricos object:
        const richContent = {
            nodes: [
                {
                    type: "PARAGRAPH",
                    id: "foo",
                    nodes: [
                        {
                            type: "TEXT",
                            id: "bar",
                            nodes: [],
                            textData: {
                                text:
                                    post.body.substring(0, 500) +
                                    "... (Full content not supported in simple adapter)",
                                decorations: [],
                            },
                        },
                    ],
                },
            ],
            metadata: {
                version: 1,
                createdTimestamp: new Date().toISOString(),
                updatedTimestamp: new Date().toISOString(),
            },
        };

        const payload = {
            draftPost: {
                title: post.attributes.title,
                memberId: memberId, // Optional depending on auth type, but good to have if known
                richContent: richContent,
                publish: true,
            },
        };

        try {
            const response = await axios.post(API_URL, payload, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data.draftPost;
            // Wix API returns draftPost object. URL might need to be constructed or fetched.
            // Assuming we get an ID.

            return {
                id: data.id,
                url: `https://wix-site-url.com/post/${data.slug}`, // Placeholder URL as real one depends on site
            };
        } catch (error: any) {
            logger.error(
                "Wix publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
