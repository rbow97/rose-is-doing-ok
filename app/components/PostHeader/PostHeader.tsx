import { useMood } from "@/context/MoodContext";
import Link from "next/link";
import styles from "./PostHeader.module.css";
import clsx from "clsx";

interface PostHeaderProps {
  id: string;
  title: string;
  date: string;
  moodType?: string;
  className?: string;
}

export function PostHeader({
  id,
  title,
  date,
  moodType,
  className,
}: PostHeaderProps) {
  const { getMoodColour } = useMood();

  return (
    <div className={clsx(styles.postHeader, className)}>
      <Link href={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      {moodType && (
        <span
          style={{ backgroundColor: getMoodColour(moodType) }}
          className={styles.moodIndicator}
        />
      )}
      <time>{date}</time>
    </div>
  );
}
