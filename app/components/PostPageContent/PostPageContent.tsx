"use client";

import { useScrollSnap } from "@/app/hooks/useScrollSnap";
import { Post } from "@/sanity/schemaTypes/post";
import { useRef } from "react";
import { Grid } from "../Grid/Grid";
import { Polaroid } from "../media/Polaroid/Polaroid";
import { PostMeta } from "../posts/PostContent/PostMeta";
import styles from "./PostPageContent.module.css";

interface PostPageContentProps {
  post: Post;
  isLandscape: boolean;
}
// }

export function PostPageContent(props: PostPageContentProps) {
  const { post } = props;
  const images = post.images;
  const isSingleImage = images.length === 1;

  const imagesRef = useRef<HTMLDivElement | null>(null);

  useScrollSnap(imagesRef);

  return (
    <Grid gutter={60} columns={6} className={styles.container}>
      <div className={styles.images} ref={imagesRef}>
        {images.map((image) => {
          return (
            <div key={image._key} className={styles.image}>
              <Polaroid
                src={image.asset.url}
                alt={image.asset.alt || post.header}
                width={image.asset.metadata.dimensions.width}
                height={image.asset.metadata.dimensions.height}
                className={
                  isSingleImage ? styles.singleImage : styles.multiImage
                }
              />
            </div>
          );
        })}
      </div>
      <PostMeta post={post} />
    </Grid>
  );
}
