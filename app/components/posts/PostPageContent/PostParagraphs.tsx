import { Post } from "@/sanity/schemaTypes/post";
import styles from "./PostPageContent.module.css";

interface PostParagraphProps {
  post: Post;
}

export function PostParagraphs(props: PostParagraphProps) {
  const { post } = props;
  return (
    <>
      {post.content?.split("\n").map(
        (paragraph, index) =>
          paragraph.trim() && (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          )
      )}
    </>
  );
}
