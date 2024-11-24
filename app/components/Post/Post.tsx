"use client";

import { type Post, type SanityImage } from "@/sanity/schemaTypes/post";
import Image from "next/image";
import Link from "next/link";
import styles from "./Post.module.css";

interface PostProps {
  post: Post;
}

interface ImageStackProps {
  images: SanityImage[];
  header: string;
}

export default function Post({ post }: PostProps) {
  const reversedImages = [...post.images].reverse();

  return (
    <article className={styles.post} key={post._id}>
      <PostLink id={post._id}>
        <ImageStack images={reversedImages} header={post.header} />
      </PostLink>
    </article>
  );
}

// Sub-components
function PostLink({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link href={`/post/${id}`}>{children}</Link>;
}

function ImageStack({ images, header }: ImageStackProps) {
  return (
    <div className={styles.imageStack}>
      {images?.map((image, index) => {
        const aspectRatio = image.asset?.metadata?.dimensions?.aspectRatio ?? 1;
        const isLandscape = aspectRatio >= 1;

        return (
          <div
            key={image._key}
            className={`${styles.imageContainer} ${isLandscape ? styles.landscape : styles.portrait}`}
          >
            <Image
              src={image.asset.url}
              alt={`${header} ${index + 1}`}
              width={300}
              height={225}
              quality={95}
              className={styles.image}
            />
          </div>
        );
      })}
    </div>
  );
}
