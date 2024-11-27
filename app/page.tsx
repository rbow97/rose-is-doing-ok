import { fetchPostsSafely } from "@/utils/utils";
import { PostGrid } from "./components/posts/PostGrid/PostGrid";

export const revalidate = 0;

export default async function Home() {
  const { data: posts, error } = await fetchPostsSafely();

  if (error) return <div>Failed to load posts</div>;
  if (!posts?.length) return <div>No posts found</div>;

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()
  );

  return <PostGrid posts={sortedPosts} />;
}
