import { getAllPosts } from "@/utils/sanity.utils";
import { IndexPageTables } from "../components/IndexPageTables/IndexPageTables";
import styles from "./page.module.css";

export function generateStaticParams() {
  return [{ page: "index" }];
}

export default async function DynamicPage({
  params,
}: {
  params: { page: string };
}) {
  const posts = await getAllPosts();

  if (params.page === "index") {
    return (
      <section className={styles.container}>
        <IndexPageTables posts={posts} />
      </section>
    );
  }
  return null;
}
