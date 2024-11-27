import { PostPageContent } from "@/app/components/posts/PostPageContent/PostPageContent";
import { fetchPostById } from "@/utils/utils";
import styles from "./page.module.css";

type Params = Promise<{ id: string }>;

type Props = {
  params: Params;
};

export default async function PostPage(props: Props) {
  const params = await props.params;
  const { data: post, error } = await fetchPostById(params.id);

  if (error) return <div>Failed to load posts</div>;
  if (!post) return <div>No posts found</div>;

  return (
    <section className={styles.section}>
      <PostPageContent post={post} />
    </section>
  );
}
