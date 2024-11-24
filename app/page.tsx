import { fetchPostsSafely } from "@/utils/utils";
import { Grid } from "./components/Grid/Grid";
import Post from "./components/Post/Post";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function Home() {
  const { data: posts, error } = await fetchPostsSafely();

  if (error) return <div>Failed to load posts</div>;
  if (!posts?.length) return <div>No posts found</div>;

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()
  );

  return (
    <Grid gutter={60} columns={3} rowGap="xl" className={styles.container}>
      {sortedPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Grid>
  );
}
