import { getAllPosts } from "@/utils/sanity.utils";
import { IndexPageTables } from "../components/IndexPageTables/IndexPageTables";
import styles from "./page.module.css";

export function generateStaticParams() {
  return [{ page: "index" }];
}

type Params = Promise<{ page: string }>;

type Props = {
  params: Params;
};

export default async function DynamicPage(props: Props) {
  const params = await props.params;
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
