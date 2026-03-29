import { BlogPost } from "./types";
import { MLBB_BLOGS_DATA } from "./mlbb";
import { HOK_BLOGS_DATA } from "./hok";

// Combine all game-specific blogs here
export const BLOGS_DATA: BlogPost[] = [
    ...MLBB_BLOGS_DATA,
    ...HOK_BLOGS_DATA,
    // Add other games high-level here as [...FREE_FIRE_BLOGS, ...etc]
];
