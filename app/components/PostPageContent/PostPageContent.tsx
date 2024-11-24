"use client";

import { Post } from "@/sanity/schemaTypes/post";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Grid } from "../Grid/Grid";
import { PagePostContent } from "../PagePost/PagePostCotent";
import styles from "./PostPageContent.module.css";

interface PostPageContentProps {
  post: Post;
  isLandscape: boolean;
}

export function PostPageContent(props: PostPageContentProps) {
  const { post } = props;
  const images = post.images;
  const imagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!imagesRef.current) return;

      event.preventDefault();
      const isMobile = window.innerWidth < 768;
      const container = imagesRef.current;

      // Get the scroll amount
      const delta = event.deltaY;

      if (isMobile) {
        // Calculate the next snap point
        const currentScroll = container.scrollLeft;
        const itemWidth = container.offsetWidth;
        const direction = delta > 0 ? 1 : -1;

        container.scrollTo({
          left: currentScroll + direction * itemWidth,
          behavior: "smooth",
        });
      } else {
        // Calculate the next snap point
        const currentScroll = container.scrollTop;
        const itemHeight = container.offsetHeight;
        const direction = delta > 0 ? 1 : -1;

        container.scrollTo({
          top: currentScroll + direction * itemHeight,
          behavior: "smooth",
        });
      }
    };

    // Add touch handling for mobile
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!imagesRef.current) return;

      touchEnd = e.changedTouches[0].screenX;
      const container = imagesRef.current;
      const direction = touchStart > touchEnd ? 1 : -1;
      const itemWidth = container.offsetWidth;

      container.scrollTo({
        left: container.scrollLeft + direction * itemWidth,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <Grid gutter={60} columns={6} className={styles.container}>
      <div className={styles.images} ref={imagesRef}>
        {images.map((image) => {
          const aspectRatio =
            image.asset?.metadata?.dimensions?.aspectRatio ?? 1;
          const isLandscape = aspectRatio >= 1;

          return (
            <div key={image._key} className={styles.image}>
              <div
                className={`${styles.polaroidWrapper} ${isLandscape ? styles.landscape : styles.portrait}`}
              >
                <Image
                  src={image.asset.url}
                  alt={image.asset.alt || "image"}
                  width={isLandscape ? 1200 : 800}
                  height={isLandscape ? 800 : 1200}
                  quality={95}
                  priority
                  className={styles.featuredImage}
                />
              </div>
            </div>
          );
        })}
      </div>
      <PagePostContent
        moodType={post.moodType}
        post={post}
        className={styles.content}
      />
    </Grid>
  );
}
