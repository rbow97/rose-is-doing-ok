import { fetchDynamicHeaders } from "@/utils/utils";
import { Grid } from "../components/global/Grid/Grid";
import { RoseIsTable } from "../components/RoseIsTable/RoseIsTable";
import styles from "./page.module.css";

export default async function Roseis() {
  const { data: entries } = await fetchDynamicHeaders();

  const formattedEntries = entries.map((entry) => ({
    ...entry,
    _createdAt: new Date(entry._createdAt).toLocaleDateString(),
  }));

  return (
    <section>
      <Grid columns={6}>
        <RoseIsTable className={styles.table} entries={formattedEntries} />
      </Grid>
    </section>
  );
}
