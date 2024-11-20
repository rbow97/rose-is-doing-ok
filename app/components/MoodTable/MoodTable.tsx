"use client";

import { useRouter } from "next/navigation";
import { Table } from "../Table/Table";
import { useState } from "react";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import styles from "./MoodTable.module.css";
import { MoodType } from "@/sanity/schemaTypes/post";
import Image from "next/image";

interface MoodTableProps {
  entries: {
    date: string;
    id: string;
    mood: { type: MoodType; image?: string };
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
                <MoodIndicator moodType={entry.mood.type} />
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

function MoodIndicator({ moodType }: { moodType: MoodType }) {
  return (
    <Image
      src={`/moods/${moodType}.svg`}
      alt={moodType}
      width={16}
      height={16}
      className={styles.mood}
    />
  );
}
