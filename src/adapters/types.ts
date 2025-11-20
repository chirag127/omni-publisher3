import { Post } from "../utils/markdown";

export interface PublishResult {
    id: string;
    url: string;
}

export interface Adapter {
    publish(post: Post): Promise<PublishResult>;
    update?(id: string, post: Post): Promise<PublishResult>;
}
