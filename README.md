# Omni-Publisher Content Ecosystem

A powerful "Write Once, Publish Everywhere" automation system that syndicates Markdown content to multiple blogging platforms and generates a static website.

## 🚀 Features

-   **Multi-Platform Syndication**: Publish to Dev.to, Hashnode, Medium, WordPress, Blogger, Tumblr, Wix, Write.as, Telegraph, and Micro.blog.
-   **Static Site Generator**: Automatically builds a fast, SEO-friendly static site from your markdown files.
-   **Idempotency**: Tracks published posts in `.postmap.json` to prevent duplicates and enable updates.
-   **Robust CLI**: Supports `--dry-run`, `--mock`, and concurrency limits.
-   **CI/CD Ready**: GitHub Actions for automated deployment and publishing.

## ⚠️ Important Notes

-   **Ghost Platform Removed**: As per requirements, Ghost support has been completely removed.
-   **Substack Support**: The Substack API is **unofficial and undocumented**. The adapter included is a placeholder/stub to acknowledge the platform but avoids using fragile reverse-engineered methods that could lead to account bans.
-   **API Research**: All adapters were implemented based on **two fresh web searches** performed during the initialization of this project to ensure the latest API endpoints and authentication methods are used.

## 🛠️ Setup

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/chirag127/omni-publisher3.git
    cd omni-publisher3
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Configure Environment:**
    Copy `.env.example` to `.env` and fill in your API keys.
    \`\`\`bash
    cp .env.example .env
    \`\`\`

## 🔑 Environment Variables

| Variable                   | Description                                            |
| :------------------------- | :----------------------------------------------------- |
| `DEVTO_API_KEY`            | API Key from Dev.to Settings > Extensions              |
| `HASHNODE_TOKEN`           | Personal Access Token from Hashnode Developer Settings |
| `MEDIUM_INTEGRATION_TOKEN` | Integration Token from Medium Settings                 |
| `WP_ACCESS_TOKEN`          | WordPress Application Password                         |
| `BLOGGER_CLIENT_ID`        | Google Cloud OAuth Client ID                           |
| `TUMBLR_CONSUMER_KEY`      | Tumblr OAuth Consumer Key                              |
| `WIX_API_TOKEN`            | Wix API Key with Blog permissions                      |
| `WRITEAS_API_TOKEN`        | Write.as Auth Token                                    |
| `TELEGRAPH_ACCESS_TOKEN`   | Telegraph Account Access Token                         |
| `MICROBLOG_TOKEN`          | Micro.blog App Token                                   |

_(See `.env.example` for the full list)_

## 📦 Usage

### CLI Commands

-   **Publish all posts:**
    \`\`\`bash
    npm run publish
    \`\`\`

-   **Dry Run (Simulate without publishing):**
    \`\`\`bash
    npm run publish:dry
    \`\`\`

-   **Mock Mode (Test with local mock server):**
    \`\`\`bash

    # Terminal 1

    npm run start:mock

    # Terminal 2

    npm run publish:mock
    \`\`\`

-   **Build Static Site:**
    \`\`\`bash
    npm run build:site
    \`\`\`

### GitHub Actions

1.  **Deploy Site**: Automatically builds and deploys the static site to GitHub Pages on push to `main`.
2.  **Publish Sync**: Runs daily to sync new posts to all configured platforms.
3.  **Issue to Post**: Label an issue with `publish` to automatically convert it into a blog post and commit it.

## 🧪 Testing

Run the test suite (uses Jest and the Mock Server):
\`\`\`bash
npm test
\`\`\`

## 📝 Content Generation

The project includes a script to generate 50 SEO-optimized sample posts:
\`\`\`bash
npx ts-node src/generate-content.ts
\`\`\`

## 📄 License

MIT
