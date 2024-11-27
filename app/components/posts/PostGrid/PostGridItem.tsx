"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { useEffect, useState } from "react";

import { Grid } from "../../Grid/Grid";
import { Post as PostType, SanityImage } from "@/sanity/schemaTypes/post";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (formattedDate) {
      setIsReady(true);
    }
  }, [formattedDate]);

  return (
    <Grid.Item
      key={post._id}
      as="article"
      desktop={{ column: gridColumn as `${number} / ${number}` }}
      mobile={{ column: "1 / -1" }}
      className={`${styles.post} ${isReady ? styles.fadeIn : ""}`}
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
