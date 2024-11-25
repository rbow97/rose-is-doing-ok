import { PostPageContent } from "@/app/components/PostPageContent/PostPageContent";
import { fetchPostById } from "@/utils/utils";
import styles from "./page.module.css";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export default async function PostPage(props: Props) {
  const params = await props.params;
  const { data: post, error } = await fetchPostById(params.id);

  if (error) return <div>Failed to load posts</div>;
  if (!post) return <div>No posts found</div>;

  const firstImage = post.images[0];
  const aspectRatio = firstImage.asset.metadata.dimensions.aspectRatio;
  const isLandscape = aspectRatio >= 1;

  return (
    <section className={styles.section}>
      <PostPageContent post={post} isLandscape={isLandscape} />
    </section>
  );
}
