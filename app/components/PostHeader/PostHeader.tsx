import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostHeader.module.css";

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
  return (
    <div className={clsx(styles.postHeader, className)}>
      <Link href={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      {moodType && (
        <Image
          src={`/moods/${moodType}.svg`}
          alt={moodType}
          width={16}
          height={16}
          className={styles.moodIndicator}
        />
      )}
      <time>{date}</time>
    </div>
  );
}
