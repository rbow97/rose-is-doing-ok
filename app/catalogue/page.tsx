import { getAllPosts } from "@/utils/sanity.utils";
import { CataloguePageTables } from "../components/CataloguePageTables/CataloguePageTables";

export default async function CataloguePage() {
  const posts = await getAllPosts();

  return (
    <section className="paddingTop">
      <CataloguePageTables posts={posts} />
    </section>
  );
}
