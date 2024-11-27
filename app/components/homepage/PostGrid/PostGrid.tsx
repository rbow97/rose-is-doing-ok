"use client";

import { useGridPositions } from "@/app/hooks/useGridPositions";
import { Post as PostType } from "@/sanity/schemaTypes/post";
import { Grid } from "../../global/Grid/Grid";
import PostGridItem from "./PostGridItem";
interface PostGridProps {
  posts: PostType[];
}

export function PostGrid({ posts }: PostGridProps) {
  const gridItems = useGridPositions(posts);

  return (
    <Grid gutter={20} columns={4}>
      {gridItems.map(({ post, isLandscape, images, gridColumn }) => (
        <PostGridItem
          key={post._id}
          post={post}
          isLandscape={isLandscape}
          images={images}
          gridColumn={gridColumn}
          date={post.dateUploaded}
        />
      ))}
    </Grid>
  );
}
