"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { useImageLoading } from "@/app/hooks/useImageLoading";
import { Post as PostType, SanityImage } from "@/sanity/schemaTypes/post";
import { Grid } from "../../global/Grid/Grid";
import Post from "../Post/Post";
import styles from "./PostGrid.module.css";

interface PostGridItemProps {
  post: PostType;
  isLandscape: boolean;
  images: SanityImage[];
  gridColumn: string;
  date: string;
}

export default function PostGridItem({
  post,
  isLandscape,
  images,
  date,
  gridColumn,
}: PostGridItemProps) {
  const formattedDate = useFormattedDate(date);
  const { isReady } = useImageLoading({
    images,
    dependencies: [formattedDate],
  });

  return (
    <Grid.Item
      key={post._id}
      as="article"
      desktop={{ column: gridColumn as `${number} / ${number}` }}
      mobile={{ column: "1 / -1" }}
      className={`${styles.post} ${isReady ? "fadeIn" : ""}`}
    >
      <Post
        isLandscape={isLandscape}
        images={images}
        header={post.header}
        date={formattedDate}
        id={post._id}
      />
    </Grid.Item>
  );
}
