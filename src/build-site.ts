import fs from "fs";
import path from "path";
import { getPosts, Post } from "./utils/markdown";
import logger from "./utils/logger";

const POSTS_DIR = path.join(__dirname, "../content/posts");
const PUBLIC_DIR = path.join(__dirname, "../public");
const ASSETS_DIR = path.join(PUBLIC_DIR, "assets");

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR);

// Basic HTML Template
const template = (title: string, content: string, isIndex = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Omni-Publisher</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <meta name="description" content="${title}">
</head>
<body class="bg-gray-50 text-gray-900 font-sans antialiased">
    <nav class="bg-white shadow mb-8">
        <div class="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-blue-600">Omni-Publisher</a>
            <div class="space-x-4">
                <a href="/" class="hover:text-blue-600">Home</a>
                <a href="https://github.com/chirag127/omni-publisher3" class="hover:text-blue-600">GitHub</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto px-4 pb-12">
        ${content}
    </main>

    <footer class="bg-white border-t mt-12 py-8 text-center text-gray-500">
        <p>&copy; ${new Date().getFullYear()} Omni-Publisher Ecosystem. Generated automatically.</p>
    </footer>
</body>
</html>
`;

async function build() {
    logger.info("Building static site...");
    const posts = getPosts(POSTS_DIR);

    // Build Index Page
    const indexContent = `
    <header class="mb-12 text-center">
        <h1 class="text-4xl font-extrabold mb-4">Latest Articles</h1>
        <p class="text-xl text-gray-600">Syndicated across the web, hosted here.</p>
    </header>
    <div class="grid gap-8 md:grid-cols-2">
        ${posts
            .map(
                (post) => `
            <article class="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h2 class="text-2xl font-bold mb-2">
                    <a href="/posts/${
                        post.attributes.slug
                    }.html" class="hover:text-blue-600">
                        ${post.attributes.title}
                    </a>
                </h2>
                <p class="text-gray-500 text-sm mb-4">${
                    post.attributes.date
                } • ${post.attributes.author}</p>
                <p class="text-gray-700 mb-4">${post.attributes.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${post.attributes.tags
                        .map(
                            (tag) => `
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tag}</span>
                    `
                        )
                        .join("")}
                </div>
            </article>
        `
            )
            .join("")}
    </div>
  `;

    fs.writeFileSync(
        path.join(PUBLIC_DIR, "index.html"),
        template("Home", indexContent, true)
    );

    // Build Individual Post Pages
    const postsDir = path.join(PUBLIC_DIR, "posts");
    if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

    posts.forEach((post) => {
        const postContent = `
        <article class="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow">
            <header class="mb-8 not-prose">
                <h1 class="text-4xl font-extrabold mb-4">${
                    post.attributes.title
                }</h1>
                <div class="flex items-center text-gray-600 text-sm space-x-4">
                    <span>${post.attributes.date}</span>
                    <span>By ${post.attributes.author}</span>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${post.attributes.tags
                        .map(
                            (tag) => `
                        <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">#${tag}</span>
                    `
                        )
                        .join("")}
                </div>
            </header>
            <div class="markdown-body">
                ${post.html}
            </div>
        </article>
    `;
        fs.writeFileSync(
            path.join(postsDir, `${post.attributes.slug}.html`),
            template(post.attributes.title, postContent)
        );
    });

    logger.info(`Built ${posts.length} pages.`);
}

build().catch((err) => logger.error(err));
