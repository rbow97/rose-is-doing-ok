"use client";

import { useScrollSnap } from "@/app/hooks/useScrollSnap";
import { Post } from "@/sanity/schemaTypes/post";
import { useRef } from "react";
import { Grid } from "../Grid/Grid";
import { Polaroid } from "../media/Polaroid/Polaroid";
import { PostMeta } from "../posts/PostContent/PostMeta";
import styles from "./PostPageContent.module.css";
import clsx from "clsx";

interface PostPageContentProps {
  post: Post;
  isLandscape: boolean;
}

export function PostPageContent(props: PostPageContentProps) {
  const { post } = props;
  const images = post.images;
  const isSingleImage = images.length === 1;

  const imagesRef = useRef<HTMLDivElement | null>(null);

  useScrollSnap(imagesRef);

  return (
    <Grid gutter={60} columns={6} className={styles.container}>
      <Grid.Item mobile={{ column: "1 / -1" }} desktop={{ column: "1 / 3" }}>
        <PostMeta post={post} />
      </Grid.Item>
      <Grid.Item
        className={styles.image}
        ref={imagesRef}
        mobile={{ column: "1 / -1", row: "1 / 2" }}
        desktop={{ column: "4 / 7" }}
      >
        {images.map((image) => {
          return (
            <div key={image._key} className={styles.image}>
              <Polaroid
                src={image.asset.url}
                alt={image.asset.alt || post.header}
                width={image.asset.metadata.dimensions.width}
                height={image.asset.metadata.dimensions.height}
                className={clsx(
                  isSingleImage ? styles.singleImage : styles.multiImage,
                  styles.polaroidImage
                )}
              />
            </div>
          );
        })}
      </Grid.Item>
    </Grid>
  );
}
