import { Adapter, PublishResult } from "./types";
import { Post } from "../utils/markdown";
import logger from "../utils/logger";

export const substack: Adapter = {
    async publish(post: Post): Promise<PublishResult> {
        logger.warn(
            "Substack API is unofficial and not publicly supported. Skipping publish to avoid account ban or instability."
        );

        // To implement this "unofficially", one would typically need to reverse engineer the internal API
        // used by the Substack web dashboard, which involves handling cookies, CSRF tokens, and internal endpoints.
        // This is fragile and often breaks.

        // For this repo, we acknowledge the platform but respect the lack of a public API.

        return {
            id: "skipped-substack",
            url: "https://substack.com",
        };
    },
};
