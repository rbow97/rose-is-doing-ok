"use client";

import { SanityImage } from "@/sanity/schemaTypes/post";
import { BaseImage } from "../../media/Image/Image";
import styles from "./Post.module.css";
import { PostHeader } from "./PostHeader";
import { PostLink } from "./PostLink";

interface PostProps {
  isLandscape: boolean;
  images: SanityImage[];
  header: string;
  date: string;
  id: string;
}

export default function Post({
  images,
  header,
  date,
  id,
  isLandscape,
}: PostProps) {
  const image = images[0];

  return (
    <>
      <PostLink id={id} className={styles.postLink}>
        <div
          className={styles.imageWrapper}
          style={{ paddingTop: isLandscape ? "66%" : "138%" }}
        >
          <BaseImage
            className={styles.image}
            src={image.asset.url}
            alt={image.asset.alt || header}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
          />
        </div>
      </PostLink>
      <PostHeader
        className={styles.header}
        id={id}
        title={header}
        date={date}
      />
    </>
  );
}
