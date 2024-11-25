"use client";

import {
  MoodType,
  type Post,
  type SanityImage,
} from "@/sanity/schemaTypes/post";
import Image from "next/image";
import Link from "next/link";
import styles from "./Post.module.css";
import { useFormattedDate } from "@/app/hooks/useFormattedDate";

interface PostProps {
  post: Post;
}

interface ImageStackProps {
  images: SanityImage[];
  date: string;
  header: string;
  moodType?: MoodType;
}

export default function Post({ post }: PostProps) {
  const reversedImages = [...post.images].reverse();
  const formattedDate = useFormattedDate(post._createdAt);

  return (
    <article className={styles.post} key={post._id}>
      <PostLink id={post._id}>
        <ImageStack
          date={formattedDate}
          images={reversedImages}
          header={post.header}
          moodType={post.moodType}
        />
      </PostLink>
    </article>
  );
}

// Sub-components
function PostLink({ id, children }: { id: string; children: React.ReactNode }) {
  return <Link href={`/post/${id}`}>{children}</Link>;
}

function ImageStack({ images, header, date, moodType }: ImageStackProps) {
  return (
    <div className={styles.imageStack}>
      {images?.map((image, index) => {
        const aspectRatio = image.asset?.metadata?.dimensions?.aspectRatio ?? 1;
        const isLandscape = aspectRatio >= 1;

        return (
          <div
            key={image._key}
            className={`${styles.polaroidWrapper} ${isLandscape ? styles.landscape : styles.portrait}`}
          >
            <div
              className={`${styles.imageContainer} ${isLandscape ? styles.landscape : styles.portrait}`}
            >
              <Image
                src={image.asset.url}
                alt={`${header} ${index + 1}`}
                width={isLandscape ? 300 : 225}
                height={isLandscape ? 225 : 300}
                quality={95}
                className={styles.image}
              />
            </div>
            <div className={styles.caption}>
              <h2>{header}</h2>
              {moodType && (
                <div className={styles.mood}>
                  <Image
                    src={`/moods/${moodType}.svg`}
                    alt={moodType}
                    width={16}
                    height={16}
                  />
                </div>
              )}
              <p className={styles.date}>{date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
