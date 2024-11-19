import { getAllPosts } from "@/utils/sanity.utils";
import { CataloguePageTables } from "../components/CataloguePageTables/CataloguePageTables";

export const revalidate = 0;

export default async function CataloguePage() {
  const posts = await getAllPosts();

  return (
    <section className="paddingTop">
      <CataloguePageTables posts={posts} />
    </section>
  );
}
