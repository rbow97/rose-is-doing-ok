import type { Post, SanityImage } from "@/sanity/schemaTypes/post";
import Image from "next/image";
import styles from "./Post.module.css";

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const firstImage = post.images?.[0];
  const firstImageAspectRatio =
    (firstImage as SanityImage)?.asset?.metadata?.dimensions?.aspectRatio ?? 1;

  return (
    <article className={styles.post} key={post._id}>
      <div
        className={`${styles.imageStack} ${firstImageAspectRatio >= 1 ? styles.landscape : styles.portrait}`}
      >
        {post.images?.map((image: SanityImage, index) => {
          const aspectRatio = image.asset.metadata.dimensions.aspectRatio;

          return (
            <Image
              key={image._key}
              src={image.asset.url}
              alt={`${post.header} ${index + 1}`}
              width={aspectRatio >= 1 ? 300 : 200}
              height={aspectRatio >= 1 ? 200 : 300}
              className={styles.image}
            />
          );
        })}
      </div>

      <div className={styles.postHeader}>
        <h2>{post.header}</h2>
        <time>{new Date(post.dateUploaded).toLocaleDateString()}</time>
      </div>
    </article>
  );
}
