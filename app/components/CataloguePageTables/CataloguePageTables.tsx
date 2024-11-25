"use client";

import { Post, SanityImage } from "@/sanity/schemaTypes/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CatalogueTable } from "../CatalogueTable/CatalogueTable";
import { Grid } from "../Grid/Grid";
import { PolaroidSmall } from "../media/PolaroidSmall/PolaroidSmall";
import styles from "./CataloguePageTables.module.css";

interface CataloguePageTablesProps {
  posts: Post[];
}

export function CataloguePageTables({ posts }: CataloguePageTablesProps) {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState<SanityImage | null>(null);

  return (
    <Grid columns={6}>
      <CatalogueTable
        className={styles.catalogueTable}
        posts={posts}
        onPostClick={(id) => router.push(`/post/${id}`)}
        onHover={setHoveredImage}
      />
      {hoveredImage && (
        <PolaroidSmall
          src={hoveredImage.asset.url}
          alt={hoveredImage.asset.alt || "Preview"}
          width={hoveredImage.asset.metadata.dimensions.width}
          height={hoveredImage.asset.metadata.dimensions.height}
        />
      )}
    </Grid>
  );
}
