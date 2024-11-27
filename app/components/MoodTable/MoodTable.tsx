"use client";

import { MoodType, SanityImage } from "@/sanity/schemaTypes/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BaseImage } from "../media/Image/Image";
import { Table } from "../Table/Table";
import styles from "./MoodTable.module.css";

interface MoodTableProps {
  entries: {
    date: string;
    id: string;
    mood: { type: MoodType; image?: SanityImage };
  }[];
  className?: string;
}

export function MoodTable({ entries, className }: MoodTableProps) {
  const [hoveredImage, setHoveredImage] = useState<SanityImage | null>(null);
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

      {hoveredImage && (
        <div className={`${styles.imagePreviewContainer} fadeIn`}>
          <BaseImage
            src={hoveredImage.asset.url}
            alt={hoveredImage.asset.alt || "Preview"}
            width={hoveredImage.asset.metadata.dimensions.width}
            height={hoveredImage.asset.metadata.dimensions.height}
          />
        </div>
      )}
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
