import { fetchPostsSafely } from "@/utils/utils";
import { Grid } from "../components/global/Grid/Grid";
import { MoodTable } from "../components/MoodTable/MoodTable";
import styles from "./page.module.css";
import { transformMoodData } from "@/utils/moodUtils";

export const revalidate = 0;

export default async function MoodPage() {
  const { data: posts, error } = await fetchPostsSafely();

  if (error) return <div>Failed to load mood data</div>;
  if (!posts?.length) return <div>No mood data found</div>;

  const moodEntries = transformMoodData(posts);
  return (
    <section className={styles.container}>
      <Grid columns={6}>
        <MoodTable entries={moodEntries} className={styles.table} />
      </Grid>
    </section>
  );
}
