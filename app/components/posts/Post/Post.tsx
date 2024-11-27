"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { SanityImage, type Post } from "@/sanity/schemaTypes/post";
import { BaseImage } from "../../media/Image/Image";
import { PostHeader } from "./PostHeader";
import styles from "./Post.module.css";
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
  const formattedDate = useFormattedDate(date);

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
      <PostHeader id={id} title={header} date={formattedDate} />
    </>
  );
}
