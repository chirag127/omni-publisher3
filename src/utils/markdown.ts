import fs from "fs";
import path from "path";
import frontMatter from "front-matter";
import { marked } from "marked";

export interface PostAttributes {
    title: string;
    date: string;
    description: string;
    tags: string[];
    slug: string;
    author: string;
}

export interface Post {
    filepath: string;
    attributes: PostAttributes;
    body: string;
    html: string;
}

export function parsePost(filepath: string): Post {
    const content = fs.readFileSync(filepath, "utf8");
    const { attributes, body } = frontMatter<PostAttributes>(content);
    const html = marked(body);

    return {
        filepath,
        attributes,
        body,
        html: html as string,
    };
}

export function getPosts(dir: string): Post[] {
    const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
    return files.map((file) => parsePost(path.join(dir, file)));
}
