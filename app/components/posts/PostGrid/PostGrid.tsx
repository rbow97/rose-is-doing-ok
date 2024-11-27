"use client";

import { Grid } from "../../Grid/Grid";
import { useGridPositions } from "@/app/hooks/useGridPositions";
import { Post as PostType } from "@/sanity/schemaTypes/post";
import Post from "../Post/Post";

interface PostGridProps {
  posts: PostType[];
}

export function PostGrid({ posts }: PostGridProps) {
  const gridItems = useGridPositions(posts);

  return (
    <Grid gutter={20} columns={4}>
      {gridItems.map(({ post, isLandscape, images, gridColumn }) => (
        <Grid.Item
          key={post._id}
          as="article"
          desktop={{ column: gridColumn as `${number} / ${number}` }}
          mobile={{ column: "1 / -1" }}
        >
          <Post
            isLandscape={isLandscape}
            images={images}
            header={post.header}
            date={post.dateUploaded}
            id={post._id}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
}
