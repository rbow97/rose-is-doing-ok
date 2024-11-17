import { Grid } from "@/app/components/Grid/Grid";
import { PagePostContent } from "@/app/components/PagePost/PagePostCotent";
import { getPostById } from "@/utils/sanity.utils";
import Image from "next/image";
import styles from "./page.module.css";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id);

  return (
    <section>
      <Grid gutter={60} columns={6} className={styles.container}>
        <div className={styles.image}>
          <Image
            src={post.images[0].asset.url}
            alt={post.header}
            width={300}
            height={200}
          />
        </div>
        <PagePostContent post={post} />
      </Grid>
    </section>
  );
}
