# Contributing to ContentSync-MultiPlatform-Content-Syndication-Web-App

Thank you for your interest in contributing to `ContentSync-MultiPlatform-Content-Syndication-Web-App`!

We strive to maintain a professional, high-velocity, and zero-defect development environment. All contributions are expected to adhere to these standards.

## 1. Code of Conduct

This project follows the Contributor Covenant Code of Conduct. Please read the [CODE_OF_CONDUCT.md](https://github.com/chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App/blob/main/CODE_OF_CONDUCT.md) file for details on expected behavior.

## 2. Getting Started

### 2.1. Prerequisites

Before you can contribute, please ensure you have the following installed:

*   **Node.js:** Version 20.x or higher.
*   **npm** or **Yarn** or **pnpm:** Package manager (npm is recommended).
*   **Git:** For version control.

### 2.2. Forking and Cloning

1.  Fork this repository: [https://github.com/chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App/fork](https://github.com/chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App/fork)
2.  Clone your forked repository to your local machine:
    bash
    git clone https://github.com/chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App.git
    cd ContentSync-MultiPlatform-Content-Syndication-Web-App
    

### 2.3. Setting Up the Development Environment

1.  Install dependencies:
    bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    

## 3. Contribution Workflow

We follow a standard Gitflow-like workflow for contributions:

1.  **Create a Feature Branch:** For new features or bug fixes, create a dedicated branch from the `main` branch:
    bash
    git checkout -b feature/your-feature-name
    # or for a bug fix
    git checkout -b fix/your-bug-fix
    
2.  **Make Your Changes:** Write your code, ensuring it adheres to the project's coding standards and architectural principles (as outlined in `AGENTS.md`).
3.  **Test Your Changes:** Run the test suite to ensure your changes haven't introduced regressions.
    bash
    npm run test
    # or
    # yarn test
    # or
    # pnpm test
    
4.  **Lint and Format:** Ensure your code is linted and formatted correctly.
    bash
    npm run lint
    npm run format
    # or equivalent yarn/pnpm commands
    
5.  **Commit Your Changes:** Write clear, concise commit messages. We recommend using the Conventional Commits specification.
    bash
    git add .
    git commit -m "feat: Add new syndication platform support for XYZ"
    
6.  **Push to Your Fork:** Push your branch to your forked repository:
    bash
    git push origin feature/your-feature-name
    
7.  **Open a Pull Request:** Create a Pull Request from your branch to the `main` branch of the original `chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App` repository.

## 4. Architectural & Technical Guidelines

*   **Technology Stack:** This project is built with **TypeScript**, utilizing **Vite** for build tooling and **TailwindCSS v4** for styling. For native capabilities, **Tauri v2** is employed. Testing is handled by **Biome** (linting/formatting) and **Vitest** (unit testing) with **Playwright** for end-to-end tests.
*   **Architecture:** We follow the **Feature-Sliced Design (FSD)** pattern for modularity and maintainability.
*   **Code Quality:**
    *   Adhere strictly to the directives in [AGENTS.md](https://github.com/chirag127/ContentSync-MultiPlatform-Content-Syndication-Web-App/blob/main/AGENTS.md).
    *   Write clean, well-documented, and testable code.
    *   Prioritize SOLID, DRY, and YAGNI principles.
*   **Testing:** All new code must have corresponding unit and/or integration tests. End-to-end tests should be added for critical user flows.

## 5. Pull Request Guidelines

*   **Clear Description:** Provide a detailed description of your changes, including the problem it solves and how it was tested.
*   **Link to Issues:** If your PR addresses an existing issue, please link to it (e.g., `Closes #123`).
*   **One Concern Per PR:** Avoid bundling multiple unrelated changes into a single PR.
*   **Code Review:** Be prepared to address feedback from code reviewers.

## 6. Reporting Issues

If you find a bug or have a feature request, please open an issue on the GitHub repository. Use the provided issue templates to ensure all necessary information is included.

## 7. Licensing

This project is licensed under the **CC BY-NC 4.0** license. By contributing, you agree that your contributions will be made available under this license.

Thank you for contributing!
