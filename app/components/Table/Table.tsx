"use client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Table.module.css";

interface TableProps {
  entries: {
    date: string;
    id: string;
    mood: { color: string; image?: string };
  }[];
  className?: string;
}

export function Table({ entries, className }: TableProps) {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <>
      <table className={clsx(styles.table, className)}>
        <thead>
          <tr>
            <th className={styles.header}>Date</th>
            <th className={styles.header}>Mood</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.date}
              onClick={() => router.push(`/post/${entry.id}`)}
              onMouseEnter={() => setHoveredImage(entry.mood.image || null)}
              onMouseLeave={() => setHoveredImage(null)}
              className={styles.tableRow}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/post/${entry.id}`);
                }
              }}
            >
              <td className={styles.tableCell}>
                <span className={styles.datePart}>{entry.date}</span>
              </td>
              <td>
                <span
                  className={styles.mood}
                  style={{ backgroundColor: entry.mood.color }}
                  role="img"
                  aria-label="Mood indicator"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hoveredImage && (
        <div
          className={styles.imagePreviewContainer}
          role="complementary"
          aria-label="Mood image preview"
        >
          <div className={styles.imagePreview}>
            <Image
              src={hoveredImage}
              alt="Mood visualization"
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
