import { Post } from "@/sanity/schemaTypes/post";
import { allImages, calculateGridPosition } from "@/utils/helpers";
import { useMemo } from "react";

interface GridItemData {
  post: Post;
  isLandscape: boolean;
  images: Post["images"];
  gridColumn: string;
}

export function useGridPositions(posts: Post[]): GridItemData[] {
  return useMemo(() => {
    let currentColumn = 1;

    return posts.map((post) => {
      const images = allImages(post);
      const firstImage = images[0];
      const isLandscape = firstImage.isLandscape;
      const { gridColumn, newColumn } = calculateGridPosition(
        isLandscape,
        currentColumn
      );
      currentColumn = newColumn;

      return {
        post,
        isLandscape,
        images,
        gridColumn,
      };
    });
  }, [posts]);
}
