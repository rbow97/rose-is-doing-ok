"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import {
  ContentType,
  type Post,
  type SanityImage,
} from "@/sanity/schemaTypes/post";
import Link from "next/link";
import { PostHeader } from "../PostHeader/PostHeader";
import { ResponsiveImage } from "../ResponsiveImage/ResponsiveImage";
import styles from "./Post.module.css";

interface PostProps {
  post: Post;
}

interface ImageStackProps {
  images: SanityImage[];
  isLandscape: boolean;
  header: string;
}

export default function Post({ post }: PostProps) {
  const formattedDate = useFormattedDate(post.dateUploaded);
  const firstImage = post.images?.[0];
  const aspectRatio = firstImage?.asset?.metadata?.dimensions?.aspectRatio ?? 1;
  const isLandscape = aspectRatio >= 1;

  return (
    <article className={styles.post} key={post._id}>
      <PostLink id={post._id}>
        <ImageStack
          images={post.images}
          isLandscape={isLandscape}
          header={post.header}
        />
      </PostLink>
      <PostHeader
        id={post._id}
        title={post.header}
        date={formattedDate}
        moodType={
          post.contentType === ContentType.MOOD ? post.moodType : undefined
        }
      />
    </article>
  );
}

// Sub-components
function PostLink({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link href={`/post/${id}`}>{children}</Link>;
}

function ImageStack({ images, isLandscape, header }: ImageStackProps) {
  return (
    <div
      className={`${styles.imageStack} ${isLandscape ? styles.landscape : styles.portrait}`}
    >
      {images?.map((image, index) => (
        <ResponsiveImage
          key={image._key}
          src={image.asset.url}
          alt={`${header} ${index + 1}`}
          aspectRatio={image.asset.metadata.dimensions.aspectRatio}
          blurDataURL={image.asset.lqip}
          priority={index === 0}
          className={styles.image}
        />
      ))}
    </div>
  );
}
