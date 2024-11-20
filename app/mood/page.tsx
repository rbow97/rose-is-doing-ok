import { MoodType, Post } from "@/sanity/schemaTypes/post";
import { fetchPostsSafely } from "@/utils/utils";
import { Grid } from "../components/Grid/Grid";
import { MoodTable } from "../components/MoodTable/MoodTable";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function MoodPage() {
  const { data: posts, error } = await fetchPostsSafely();

  if (error) return <div>Failed to load mood data</div>;
  if (!posts?.length) return <div>No mood data found</div>;

  // Filter posts with mood type and group by date
  const moodsByDate = posts
    .filter((post) => post.moodType)
    .reduce(
      (
        acc: {
          [key: string]: {
            mood: MoodType;
            image?: string;
            id: string;
          };
        },
        post: Post
      ) => {
        const date = new Date(post.dateUploaded).toLocaleDateString("en-GB");

        acc[date] = {
          mood: post.moodType || "neutral",
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
      type: mood.mood,
      image: mood.image,
    },
  }));

  return (
    <section className={styles.container}>
      <Grid columns={6}>
        <MoodTable entries={entries} className={styles.table} />
      </Grid>
    </section>
  );
}
