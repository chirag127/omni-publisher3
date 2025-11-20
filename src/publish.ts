import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { getPosts, Post } from "./utils/markdown";
import { loadState, updatePostState, getPostState } from "./utils/state";
import { adapters } from "./adapters";

dotenv.config();

const argv = yargs(hideBin(process.argv))
    .option("dry-run", {
        type: "boolean",
        description: "Simulate publishing without making API calls",
    })
    .option("mock", {
        type: "boolean",
        description: "Use mock server",
    })
    .option("concurrency", {
        type: "number",
        default: 2,
        description: "Number of concurrent uploads",
    })
    .parseSync();

const POSTS_DIR = path.join(__dirname, "../content/posts");

async function publishPost(post: Post, platformName: string, adapter: any) {
    const { slug } = post.attributes;
    const currentState = getPostState(slug, platformName);

    if (currentState) {
        logger.info(
            `[${platformName}] Updating post: ${post.attributes.title}`
        );
        // In a real scenario, we would check if update is supported/needed
        // For this MVP, we'll assume we might want to update or skip
        // If the adapter supports update, call it. Otherwise skip.
        if (adapter.update) {
            try {
                if (argv.dryRun) {
                    logger.info(
                        `[${platformName}] [DRY-RUN] Would update post ${slug}`
                    );
                    return;
                }
                const result = await adapter.update(currentState.id, post);
                updatePostState(slug, platformName, {
                    id: result.id,
                    url: result.url,
                    lastUpdated: new Date().toISOString(),
                });
                logger.info(`[${platformName}] Updated: ${result.url}`);
            } catch (error: any) {
                logger.error(
                    `[${platformName}] Update failed: ${error.message}`
                );
            }
        } else {
            logger.info(
                `[${platformName}] Update not supported or implemented, skipping.`
            );
        }
        return;
    }

    logger.info(
        `[${platformName}] Publishing new post: ${post.attributes.title}`
    );

    if (argv.dryRun) {
        logger.info(`[${platformName}] [DRY-RUN] Would publish post ${slug}`);
        return;
    }

    try {
        const result = await adapter.publish(post);
        updatePostState(slug, platformName, {
            id: result.id,
            url: result.url,
            lastUpdated: new Date().toISOString(),
        });
        logger.info(`[${platformName}] Published: ${result.url}`);
    } catch (error: any) {
        logger.error(`[${platformName}] Publish failed: ${error.message}`);
    }
}

async function main() {
    logger.info("Starting Omni-Publisher...");

    const posts = getPosts(POSTS_DIR);
    logger.info(`Found ${posts.length} posts.`);

    const platformNames = Object.keys(adapters);

    // Process posts
    for (const post of posts) {
        logger.info(`Processing: ${post.attributes.title}`);

        // Process platforms concurrently for this post
        // Note: We could also process posts concurrently, but let's stick to platform concurrency per post for safety
        // or use the global concurrency limit.

        // Simple concurrency implementation using chunks or just Promise.all with limit
        const queue = [...platformNames];
        const activePromises: Promise<void>[] = [];

        while (queue.length > 0 || activePromises.length > 0) {
            while (
                queue.length > 0 &&
                activePromises.length < argv.concurrency
            ) {
                const platformName = queue.shift()!;
                const adapter = adapters[platformName];

                // Check if adapter is enabled (env vars check usually happens inside adapter or here)
                // For now assuming enabled if in list

                const p = publishPost(post, platformName, adapter).then(() => {
                    activePromises.splice(activePromises.indexOf(p), 1);
                });
                activePromises.push(p);
            }

            if (activePromises.length > 0) {
                await Promise.race(activePromises);
            }
        }
    }

    logger.info("All done!");
}

main().catch((err) => {
    logger.error("Fatal error:", err);
    process.exit(1);
});
