"use client";

import { Grid } from "../Grid/Grid";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { IndexTable } from "../IndexTable/IndexTable";
import { useState } from "react";
import { Post } from "@/sanity/schemaTypes/post";
import { useRouter } from "next/navigation";
import styles from "./IndexPageTable.module.css";

interface IndexPageTablesProps {
  posts: Post[];
}

export function IndexPageTables({ posts }: IndexPageTablesProps) {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <Grid columns={6}>
      <IndexTable
        className={styles.indexTable}
        posts={posts}
        onPostClick={(id) => router.push(`/post/${id}`)}
        onHover={setHoveredImage}
      />

      <ImagePreview className={styles.imagePreview} image={hoveredImage} />
    </Grid>
  );
}
