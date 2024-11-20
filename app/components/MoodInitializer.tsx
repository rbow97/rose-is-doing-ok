"use client";

import { useMood } from "@/context/MoodContext";
import { fetchPostsSafely } from "@/utils/utils";
import { useEffect } from "react";

export function MoodInitializer() {
  const { updateMoodFromPosts } = useMood();

  useEffect(() => {
    async function initializeMoods() {
      const { data: posts, error } = await fetchPostsSafely();
      if (!error && posts) {
        updateMoodFromPosts(posts);
      }
    }

    initializeMoods();
  }, [updateMoodFromPosts]);

  return null;
}
