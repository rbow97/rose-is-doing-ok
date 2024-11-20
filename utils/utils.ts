import { getAllPosts } from "./sanity.utils";

export async function fetchPostsSafely() {
  try {
    const posts = await getAllPosts();
    return { data: posts, error: null };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Failed to fetch posts",
    };
  }
}
