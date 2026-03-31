import { BlogPost } from "./types";
import { MLBB_BLOGS_DATA } from "./mlbb";
import { HOK_BLOGS_DATA } from "./hok";
import { GENSHIN_BLOGS_DATA } from "./genshin";

// Combine all game-specific blogs here
export const BLOGS_DATA: BlogPost[] = [
    ...MLBB_BLOGS_DATA,
    ...HOK_BLOGS_DATA,
    ...GENSHIN_BLOGS_DATA,
];
