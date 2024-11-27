import { PostLink } from "./PostLink";
import styles from "./PostHeader.module.css";

interface PostHeaderProps {
  id: string;
  title: string;
  date: string;
  moodType?: string;
  className?: string;
}

export function PostHeader({ title, date, id, className }: PostHeaderProps) {
  return (
    <div className={className}>
      <h2 className={styles.title}>
        <PostLink id={id}>{title}</PostLink>
      </h2>
      <time className={styles.date}>{date}</time>
    </div>
  );
}
