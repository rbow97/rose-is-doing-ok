"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { type Post, type SanityImage } from "@/sanity/schemaTypes/post";
import Image from "next/image";
import Link from "next/link";
import { PostHeader } from "../PostHeader/PostHeader";
import styles from "./Post.module.css";
import { useRef, useState, useEffect } from "react";

interface PostProps {
  post: Post;
}

interface ImageStackProps {
  images: SanityImage[];
  header: string;
}

export default function Post({ post }: PostProps) {
  const formattedDate = useFormattedDate(post.dateUploaded);

  const reversedImages = [...post.images].reverse();

  return (
    <article className={styles.post} key={post._id}>
      <PostLink id={post._id}>
        <ImageStack images={reversedImages} header={post.header} />
      </PostLink>
      {/* <PostHeader
        id={post._id}
        title={post.header}
        date={formattedDate}
        moodType={post.moodType ? post.moodType : undefined}
      /> */}
    </article>
  );
}

// Sub-components
function PostLink({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link href={`/post/${id}`}>{children}</Link>;
}

function ImageStack({ images, header }: ImageStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(300);

  useEffect(() => {
    if (!stackRef.current) return;

    const updateWidth = () => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      setContainerWidth(Math.min(300, rect.width - 40));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(stackRef.current);

    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const getDimensions = (isLandscape: boolean) => {
    const scale = containerWidth / 300;

    if (isLandscape) {
      const baseWidth = 300 * scale;
      const baseHeight = 225 * scale;
      return {
        width: baseWidth,
        height: baseHeight,
      };
    } else {
      const baseWidth = 225 * scale;
      const baseHeight = 300 * scale;
      return {
        width: baseWidth,
        height: baseHeight,
      };
    }
  };

  return (
    <div className={styles.imageStack} ref={stackRef}>
      {images?.map((image, index) => {
        const aspectRatio = image.asset?.metadata?.dimensions?.aspectRatio ?? 1;
        const isLandscape = aspectRatio >= 1;
        const dimensions = getDimensions(isLandscape);
        console.log(isLandscape, dimensions);

        return (
          <div key={image._key} className={styles.polaroidWrapper}>
            <div className={styles.imageContainer}>
              <Image
                style={{
                  width: Math.round(dimensions.width),
                  height: Math.round(dimensions.height),
                  aspectRatio: isLandscape ? "4/3" : "3/4",
                }}
                src={image.asset.url}
                alt={`${header} ${index + 1}`}
                width={Math.round(dimensions.width)}
                height={Math.round(dimensions.height)}
                quality={95}
                className={styles.image}
              />
            </div>
            <div className={styles.caption}>{header}</div>
          </div>
        );
      })}
    </div>
  );
}
