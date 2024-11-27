"use client";

import { Post, SanityImage } from "@/sanity/schemaTypes/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Grid } from "../../global/Grid/Grid";
import { BaseImage } from "../../media/Image/Image";
import { CatalogueTable } from "../CatalogueTable/CatalogueTable";
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
        <div className={`${styles.imagePreviewContainer} fadeIn`}>
          <BaseImage
            src={hoveredImage.asset.url}
            alt={hoveredImage.asset.alt || "Preview"}
            width={hoveredImage.asset.metadata.dimensions.width}
            height={hoveredImage.asset.metadata.dimensions.height}
          />
        </div>
      )}
    </Grid>
  );
}
