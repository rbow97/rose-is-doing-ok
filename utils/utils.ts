import {
  getAllPosts,
  getDynamicHeaders,
  getMostRecentMood,
} from "./sanity.utils";

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

export async function fetchMostRecentMood() {
  try {
    const mood = await getMostRecentMood();
    return { data: mood, error: null };
  } catch (error) {
    console.error("Failed to fetch most recent mood:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch mood",
    };
  }
}

export async function fetchDynamicHeaders() {
  try {
    const entries = await getDynamicHeaders();
    return { data: entries, error: null };
  } catch (error) {
    return {
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dynamic headers",
    };
  }
}
