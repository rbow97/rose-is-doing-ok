import { getAllPosts } from "@/utils/sanity.utils";
import { Grid } from "./components/Grid/Grid";
import { MoodInitializer } from "./components/MoodInitializer";
import Post from "./components/Post/Post";
import styles from "./page.module.css";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <MoodInitializer posts={posts} />
      <Grid className={styles.container}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Grid>
    </main>
  );
}
