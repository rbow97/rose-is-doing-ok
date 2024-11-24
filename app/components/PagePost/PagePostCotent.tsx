"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { MoodType, Post } from "@/sanity/schemaTypes/post";
import styles from "./PagePostContent.module.css";
import Image from "next/image";
import clsx from "clsx";

export function PagePostContent({
  post,
  moodType,
  className,
}: {
  post: Post;
  moodType?: MoodType;
  className?: string;
}) {
  const formattedDate = useFormattedDate(post.dateUploaded);

  return (
    <section className={clsx(className, styles.container)}>
      <div className={styles.headerContainer}>
      <h1 className={styles.header}>{post.header}</h1>
      <time className={styles.time}>{formattedDate}</time>
      {moodType && (
        <Image
          className={styles.mood}
          src={`/moods/${moodType}.svg`}
          alt={moodType}
          width={16}
          height={16}
        />
      )}</div>
    </section>
  );
}
