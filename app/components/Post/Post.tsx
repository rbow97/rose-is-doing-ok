"use client";

import {
  ContentType,
  type Post,
  type SanityImage,
} from "@/sanity/schemaTypes/post";
import Image from "next/image";
import styles from "./Post.module.css";
import { useMood } from "@/context/MoodContext";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const { getMoodColour } = useMood();
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(new Date(post.dateUploaded).toLocaleDateString());
  }, [post.dateUploaded]);

  const firstImage = post.images?.[0];
  const firstImageAspectRatio =
    (firstImage as SanityImage)?.asset?.metadata?.dimensions?.aspectRatio ?? 1;

  return (
    <article className={styles.post} key={post._id}>
      <Link href={`/post/${post._id}`}>
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
      </Link>

      <div className={styles.postHeader}>
        <Link href={`/post/${post._id}`}>
          <h2>{post.header}</h2>
        </Link>
        {post.contentType === ContentType.MOOD && (
          <span
            style={
              post.moodType
                ? { backgroundColor: getMoodColour(post.moodType) }
                : undefined
            }
          />
        )}
        <time>{formattedDate}</time>
      </div>
    </article>
  );
}
