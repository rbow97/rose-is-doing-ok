"use client";

import { Grid } from "../Grid/Grid";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { CatalogueTable } from "../CatalogueTable/CatalogueTable";
import { useState } from "react";
import { Post } from "@/sanity/schemaTypes/post";
import { useRouter } from "next/navigation";
import styles from "./CataloguePageTables.module.css";

interface CataloguePageTablesProps {
  posts: Post[];
}

export function CataloguePageTables({ posts }: CataloguePageTablesProps) {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <Grid columns={6}>
      <CatalogueTable
        className={styles.catalogueTable}
        posts={posts}
        onPostClick={(id) => router.push(`/post/${id}`)}
        onHover={setHoveredImage}
      />

      <ImagePreview className={styles.imagePreview} image={hoveredImage} />
    </Grid>
  );
}
