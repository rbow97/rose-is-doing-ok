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
  const { post, isLandscape } = props;
  const images = post.images;
  const imagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!imagesRef.current) return;

      // Check if we're on mobile (based on viewport width)
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Horizontal scroll for mobile
        event.preventDefault();
        imagesRef.current.scrollBy({
          left: event.deltaY,
          behavior: "smooth",
        });
      } else {
        // Vertical scroll for desktop
        imagesRef.current.scrollBy({
          top: event.deltaY,
          behavior: "smooth",
        });
      }
    };

    // Handle touch events for mobile
    const handleTouchMove = () => {
      if (!imagesRef.current || window.innerWidth >= 768) return;
      // Mobile touch handling logic here if needed
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <Grid gutter={60} columns={6} className={styles.container}>
      <div className={styles.images} ref={imagesRef}>
        {images.map((image) => (
          <div key={image._key} className={styles.image}>
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
        ))}
      </div>
      <PagePostContent post={post} className={styles.content} />
    </Grid>
  );
}
