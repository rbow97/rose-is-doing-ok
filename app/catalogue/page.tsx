import { fetchPostsSafely } from "@/utils/utils";
import { CataloguePageTables } from "../components/CataloguePageTables/CataloguePageTables";

export const revalidate = 0;

export default async function CataloguePage() {
  const { data: posts, error } = await fetchPostsSafely();

  if (error) return <div>Failed to load catalogue</div>;
  if (!posts?.length) return <div>No posts found</div>;

  return (
    <section className="paddingTop">
      <CataloguePageTables posts={posts} />
    </section>
  );
}
