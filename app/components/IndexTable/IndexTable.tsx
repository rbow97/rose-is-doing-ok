import { Post } from "@/sanity/schemaTypes/post";
import { TwoColumnTable } from "../TwoColumnTable/TwoColumnTable";

interface GroupedPosts {
  [year: string]: Post[];
}

interface IndexTableProps {
  posts: Post[];
  onPostClick: (id: string) => void;
  onHover?: (image: string | null) => void;
  className?: string;
}

function groupPostsByYear(posts: Post[]): GroupedPosts {
  return posts.reduce<GroupedPosts>((acc, post) => {
    const year = new Date(post.dateUploaded).getFullYear().toString();
    (acc[year] = acc[year] || []).push(post);
    return acc;
  }, {});
}

function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()
  );
}

function getFirstImageUrl(post: Post): string | null {
  return post.images?.[0]?.asset.url || null;
}

export function IndexTable({
  posts,
  onPostClick,
  onHover,
  className,
}: IndexTableProps) {
  const groupedPosts = groupPostsByYear(posts);

  return (
    <TwoColumnTable className={className}>
      <TwoColumnTable.Header>By year</TwoColumnTable.Header>
      <TwoColumnTable.Body>
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, yearPosts]) => (
            <TwoColumnTable.RowGroup key={year} year={year}>
              {sortPostsByDate(yearPosts).map((post) => (
                <TwoColumnTable.ContentRow
                  key={post._id}
                  onClick={() => onPostClick(post._id)}
                  onHover={() => onHover?.(getFirstImageUrl(post))}
                  onLeave={() => onHover?.(null)}
                >
                  {post.header}
                </TwoColumnTable.ContentRow>
              ))}
            </TwoColumnTable.RowGroup>
          ))}
      </TwoColumnTable.Body>
    </TwoColumnTable>
  );
}
