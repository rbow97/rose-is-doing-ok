"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { Post } from "@/sanity/schemaTypes/post";
import styles from "./PagePostContent.module.css";

export function PagePostContent({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const formattedDate = useFormattedDate(post.dateUploaded);

  return (
    <div className={className}>
      <div className={styles.text}>
        <h1>{post.header}</h1>
        <div>
          <time>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
