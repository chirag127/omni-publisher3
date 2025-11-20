import fs from "fs";
import path from "path";

const STATE_FILE = path.resolve(".postmap.json");

export interface PlatformState {
    id: string;
    url: string;
    lastUpdated: string;
}

export interface PostState {
    [platform: string]: PlatformState;
}

export interface State {
    [slug: string]: PostState;
}

export function loadState(): State {
    if (!fs.existsSync(STATE_FILE)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

export function saveState(state: State): void {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

export function updatePostState(
    slug: string,
    platform: string,
    data: PlatformState
): void {
    const state = loadState();
    if (!state[slug]) {
        state[slug] = {};
    }
    state[slug][platform] = data;
    saveState(state);
}

export function getPostState(
    slug: string,
    platform: string
): PlatformState | undefined {
    const state = loadState();
    return state[slug]?.[platform];
}
