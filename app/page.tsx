import { getAllPosts } from "@/utils/sanity.utils";
import { Grid } from "./components/Grid/Grid";
import Post from "./components/Post/Post";
import styles from "./page.module.css";

export default async function Home() {
  const posts = await getAllPosts();

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()
  );

  return (
    <main>
      <Grid className={styles.container}>
        {sortedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Grid>
    </main>
  );
}
