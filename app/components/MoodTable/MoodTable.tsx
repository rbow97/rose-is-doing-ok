"use client";

import { useRouter } from "next/navigation";
import { Table } from "../Table/Table";
import { useState } from "react";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import styles from "./MoodTable.module.css";

interface MoodTableProps {
  entries: {
    date: string;
    id: string;
    mood: { color: string; image?: string };
  }[];
  className?: string;
}

export function MoodTable({ entries, className }: MoodTableProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const router = useRouter();
  return (
    <>
      <Table className={className}>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Mood</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          {entries.map((entry) => (
            <Table.Row
              key={entry.date}
              onHover={() => setHoveredImage(entry.mood.image ?? null)}
              onLeave={() => setHoveredImage(null)}
              onClick={() => router.push(`/post/${entry.id}`)}
            >
              <Table.Cell>{entry.date}</Table.Cell>
              <Table.Cell>
                {" "}
                <MoodIndicator color={entry.mood.color} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <ImagePreview
        image={hoveredImage}
        className={styles.imagePreviewContainer}
      />
    </>
  );
}

function MoodIndicator({ color }: { color: string }) {
  return (
    <span
      className={styles.mood}
      style={{ backgroundColor: color }}
      role="img"
      aria-label="Mood indicator"
    />
  );
}
