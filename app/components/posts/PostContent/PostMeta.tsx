import { Post } from "@/sanity/schemaTypes/post";
import styles from "./PostMeta.module.css";
import { useFormattedDate } from "@/app/hooks/useFormattedDate";
import { BaseImage } from "../../media/Image/Image";

interface PostMetaProps {
  post: Post;
}

export function PostMeta(props: PostMetaProps) {
  const { post } = props;
  const formattedDate = useFormattedDate(post.dateUploaded);

  return (
    <section className={styles.meta}>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.header}</h1>
        <div className={styles.details}>
          <time className={styles.date}>{formattedDate}</time>
          {post.moodType && (
            <BaseImage
              src={`/moods/${post.moodType}.svg`}
              alt={post.moodType}
              width={16}
              height={16}
              className={styles.mood}
            />
          )}
        </div>
      </div>
    </section>
  );
}
