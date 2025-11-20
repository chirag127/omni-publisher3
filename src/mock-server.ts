import http from "http";
import logger from "./utils/logger";

const PORT = 4000;

const server = http.createServer((req, res) => {
    logger.info(`[MOCK SERVER] ${req.method} ${req.url}`);

    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        res.setHeader("Content-Type", "application/json");

        // Default success response
        const successResponse = JSON.stringify({
            id: "mock-id-" + Date.now(),
            url: `http://localhost:${PORT}/mock-post-${Date.now()}`,
            data: { id: "mock-id", url: "http://mock-url" }, // For generic structure
            result: { path: "mock-path", url: "http://mock-url" }, // For Telegraph
            draftPost: { id: "mock-id", slug: "mock-slug" }, // For Wix
            ok: true,
        });

        // Handle specific endpoints if needed for more realistic testing
        if (req.url?.includes("graphql")) {
            res.end(
                JSON.stringify({
                    data: {
                        createPublicationStory: {
                            success: true,
                            post: {
                                _id: "mock-hashnode-id",
                                slug: "mock-slug",
                                publication: { domain: "mock.hashnode.dev" },
                            },
                        },
                    },
                })
            );
            return;
        }

        res.end(successResponse);
    });
});

server.listen(PORT, () => {
    logger.info(`Mock server running at http://localhost:${PORT}`);
});
