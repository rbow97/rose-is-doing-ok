"use client";

import { useImageLoading } from "@/app/hooks/useImageLoading";
import { Post } from "@/sanity/schemaTypes/post";
import { useRef } from "react";
import { Divider } from "../../global/Divider/Divider";
import { Grid } from "../../global/Grid/Grid";
import { BaseImage } from "../../media/Image/Image";
import { PostMeta } from "./PostMeta";
import styles from "./PostPageContent.module.css";

interface PostPageContentProps {
  post: Post;
}

export function PostPageContent(props: PostPageContentProps) {
  const { post } = props;
  const images = [...post.images];
  const { isReady } = useImageLoading({
    images,
  });

  const imagesRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Divider />
      <Grid gutter={20} columns={6} className={styles.container}>
        <Grid.Item
          className={`${styles.meta} ${isReady ? "fadeIn" : ""}`}
          mobile={{ column: "1 / -1" }}
          desktop={{ column: "1 / 3" }}
        >
          <PostMeta post={post} />
          <div className={styles.content}>{post.content}</div>
        </Grid.Item>
        <Grid.Item
          className={`${styles.image} ${isReady ? "fadeIn" : ""}`}
          ref={imagesRef}
          mobile={{ column: "1 / -1" }}
          desktop={{ column: "4 / 7" }}
        >
          {images.map((image) => {
            return (
              <div key={image._key} className={styles.imageWrapper}>
                <BaseImage
                  src={image.asset.url}
                  alt={image.asset.alt || post.header}
                  width={image.asset.metadata.dimensions.width}
                  height={image.asset.metadata.dimensions.height}
                  className={styles.polaroidImage}
                />
              </div>
            );
          })}
        </Grid.Item>
      </Grid>
    </>
  );
}
