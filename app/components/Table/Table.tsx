"use client";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Table.module.css";
import { TableRow } from "./TableRow";
import { ImagePreview } from "../ImagePreview/ImagePreview";

interface TableProps {
  entries: {
    date: string;
    id: string;
    mood: { color: string; image?: string };
  }[];
  className?: string;
}

export function Table({ entries, className }: TableProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <>
      <table className={clsx(styles.table, className)}>
        <TableHeader />
        <tbody>
          {entries.map((entry) => (
            <TableRow
              key={entry.date}
              entry={entry}
              onHover={setHoveredImage}
            />
          ))}
        </tbody>
      </table>

      <ImagePreview image={hoveredImage} />
    </>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className={styles.header}>Date</th>
        <th className={styles.header}>Mood</th>
      </tr>
    </thead>
  );
}
