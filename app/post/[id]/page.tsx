import { PostPageContent } from "@/app/components/PostPageContent/PostPageContent";
import { getPostById } from "@/utils/sanity.utils";
import styles from "./page.module.css";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export default async function PostPage(props: Props) {
  const params = await props.params;
  const post = await getPostById(params.id);
  const firstImage = post.images[0];
  const aspectRatio = firstImage.asset.metadata.dimensions.aspectRatio;
  const isLandscape = aspectRatio >= 1;

  return (
    <section className={styles.section}>
      <PostPageContent post={post} isLandscape={isLandscape} />
    </section>
  );
}
