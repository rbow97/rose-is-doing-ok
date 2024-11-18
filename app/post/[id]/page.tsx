import { Grid } from "@/app/components/Grid/Grid";
import { PagePostContent } from "@/app/components/PagePost/PagePostCotent";
import { getPostById } from "@/utils/sanity.utils";
import Image from "next/image";
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
    <section>
      <Grid gutter={60} columns={6} className={styles.container}>
        <div className={styles.image}>
          <Image
            src={firstImage.asset.url}
            alt={post.header}
            width={isLandscape ? 1200 : 800}
            height={isLandscape ? 800 : 1200}
            quality={95}
            priority
            className={styles.featuredImage}
          />
        </div>
        <PagePostContent post={post} />
      </Grid>
    </section>
  );
}
