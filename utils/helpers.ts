import { Post } from "@/sanity/schemaTypes/post";

export function allImages(post: Post) {
  return [...post.images].reverse();
}

interface GridPosition {
  gridColumn: `${number} / ${number}`;
  newColumn: number;
}

export function calculateGridPosition(
  isLandscape: boolean,
  currentColumn: number,
  maxColumns: number = 4
): GridPosition {
  const columnSpan = isLandscape ? 2 : 1;

  // Reset column if it would exceed max columns
  if (currentColumn + columnSpan > maxColumns + 1) {
    currentColumn = 1;
  }

  // Calculate grid column string
  const gridColumn =
    `${currentColumn} / ${currentColumn + columnSpan}` as const;

  // Calculate next column position
  let newColumn = currentColumn + columnSpan;
  if (newColumn > maxColumns) newColumn = 1;

  return { gridColumn, newColumn };
}
