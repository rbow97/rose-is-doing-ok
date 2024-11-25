"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import {
  MoodType,
  type Post,
  type SanityImage,
} from "@/sanity/schemaTypes/post";
import Image from "next/image";
import Link from "next/link";
import { PolaroidSmall } from "../media/PolaroidSmall/PolaroidSmall";
import styles from "./Post.module.css";

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
      {images?.map((image) => {
        return (
          <PolaroidSmall
            key={image._key}
            src={image.asset.url}
            alt={image.asset.alt || header}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            className={styles.polaroidWrapper}
          >
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
          </PolaroidSmall>
        );
      })}
    </div>
  );
}
