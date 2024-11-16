"use client";

import { useEffect } from "react";
import { useMood } from "@/context/MoodContext";
import { Post } from "@/sanity/schemaTypes/post";

export function MoodInitializer({ posts }: { posts: Post[] }) {
  const { updateMoodFromPosts } = useMood();

  useEffect(() => {
    updateMoodFromPosts(posts);
  }, [posts, updateMoodFromPosts]);

  return null;
}
