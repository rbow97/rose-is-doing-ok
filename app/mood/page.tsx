import { Table } from "../components/Table/Table";
import { Post } from "@/sanity/schemaTypes/post";
import styles from "./page.module.css";
import { postsPromise } from "../layout";
import { Grid } from "../components/Grid/Grid";

export default async function MoodPage() {
  const posts = await postsPromise;

  // Filter posts with mood type and group by date
  const moodsByDate = posts
    .filter((post) => post.contentType === "mood")
    .reduce(
      (
        acc: {
          [key: string]: {
            mood: string;
            image?: string;
            id: string;
          };
        },
        post: Post
      ) => {
        const date = new Date(post.dateUploaded).toLocaleDateString("en-GB");

        acc[date] = {
          mood: post.moodType?.toLowerCase() || "",
          image: post.images?.[0]?.asset.url,
          id: post._id,
        };
        return acc;
      },
      {}
    );

  // Transform into table entries format
  const entries = Object.entries(moodsByDate).map(([date, mood]) => ({
    date,
    id: mood.id,
    mood: {
      color: `var(--mood-${mood.mood})`,
      image: mood.image,
    },
  }));

  return (
    <section className={styles.container}>
      <Grid columns={6}>
        <Table entries={entries} className={styles.table} />
      </Grid>
    </section>
  );
}
