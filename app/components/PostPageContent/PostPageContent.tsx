"use client";

import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { useScrollSnap } from "@/app/hooks/useScrollSnap";
import { MoodType, Post } from "@/sanity/schemaTypes/post";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { Grid } from "../Grid/Grid";
import styles from "./PostPageContent.module.css";
import { PostMeta } from "../posts/PostContent/PostMeta";
import { Polaroid } from "../media/Polaroid/Polaroid";

interface PostPageContentProps {
  post: Post;
  isLandscape: boolean;
}

// export function PostPageContent(props: PostPageContentProps) {
//   const { post } = props;
//   const imagesRef = useRef<HTMLDivElement | null>(null);
//   useScrollSnap(imagesRef);

//   return (
//     <Grid gutter={60} columns={6} className={styles.container}>
//       <div className={styles.images} ref={imagesRef}>
//         {post.images.map((image) => (
//           <div key={image._key} className={styles.imageWrapper}>
//             <Polaroid
//               src={image.asset.url}
//               alt={image.asset.alt || post.header}
//               width={image.asset.metadata.dimensions.width}
//               height={image.asset.metadata.dimensions.height}
//             />
//           </div>
//         ))}
//       </div>
//       <PostMeta post={post} />
//     </Grid>
//   );
// }

export function PostPageContent(props: PostPageContentProps) {
  const { post } = props;
  const images = post.images;
  const imagesRef = useRef<HTMLDivElement | null>(null);

  useScrollSnap(imagesRef);

  return (
    <Grid gutter={60} columns={6} className={styles.container}>
      <div className={styles.images} ref={imagesRef}>
        {images.map((image) => {
          const isSingleImage = images.length === 1;
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
              {/* <div
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
              </div> */}
            </div>
          );
        })}
      </div>
      <PostPageText post={post} moodType={post.moodType} />
    </Grid>
  );
}

export function PostPageText({
  post,
  moodType,
  className,
}: {
  post: Post;
  moodType?: MoodType;
  className?: string;
}) {
  const formattedDate = useFormattedDate(post.dateUploaded);

  return (
    <section className={clsx(className, styles.textContainer)}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{post.header}</h1>
        <time className={styles.time}>{formattedDate}</time>
        {moodType && (
          <Image
            className={styles.mood}
            src={`/moods/${moodType}.svg`}
            alt={moodType}
            width={16}
            height={16}
          />
        )}
      </div>
    </section>
  );
}
