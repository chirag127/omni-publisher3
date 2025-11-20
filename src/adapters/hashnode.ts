import axios from "axios";
import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

const API_URL = "https://api.hashnode.com";

export const hashnode: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        const token = process.env.HASHNODE_TOKEN;
        const publicationId = process.env.HASHNODE_PUBLICATION_ID;

        if (!token || !publicationId) {
            throw new Error(
                "HASHNODE_TOKEN or HASHNODE_PUBLICATION_ID is missing"
            );
        }

        const query = `
      mutation createPublicationStory($input: CreateStoryInput!, $publicationId: String!) {
        createPublicationStory(input: $input, publicationId: $publicationId) {
          code
          success
          message
          post {
            _id
            slug
            publication {
              domain
            }
          }
        }
      }
    `;

        const variables = {
            publicationId: publicationId,
            input: {
                title: post.attributes.title,
                contentMarkdown: post.body,
                tags: post.attributes.tags.map((tag) => ({
                    _id: tag,
                    slug: tag,
                    name: tag,
                })), // Hashnode expects tag objects, simplifying here
                coverImageURL: null, // Add if available
            },
        };

        try {
            const response = await axios.post(
                API_URL,
                {
                    query,
                    variables,
                },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data.data.createPublicationStory;

            if (!data.success) {
                throw new Error(data.message || "Hashnode publish failed");
            }

            const postData = data.post;
            // Construct URL - this is a best guess, actual URL depends on domain setup
            const url = `https://${postData.publication.domain}/${postData.slug}`;

            return {
                id: postData._id,
                url: url,
            };
        } catch (error: any) {
            logger.error(
                "Hashnode publish error",
                error.response?.data || error.message
            );
            throw error;
        }
    },
};
