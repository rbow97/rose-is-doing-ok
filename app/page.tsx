import Image from "next/image";
import { getAllPosts } from "@/utils/sanity.utils";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Grid } from "./components/Grid/Grid";
import styles from "./page.module.css";
import { MoodInitializer } from "./components/MoodInitializer";

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <MoodInitializer posts={posts} />
      <Grid className={styles.container}>
        {posts.map((post) => (
          <article className={styles.post} key={post._id}>
            {/* Image(s) */}
            <div className={styles.imageStack}>
              {post.images?.map((image, index) => (
                <Image
                  key={index}
                  src={urlFor(image).url()}
                  alt={`${post.header} ${index + 1}`}
                  // width={image.aspectRatio >= 1 ? 300 : 200} // landscape : portrait
                  width={300}
                  // height={image.aspectRatio >= 1 ? 200 : 300} // landscape : portrait
                  height={300}
                  className={styles.image}
                />
              ))}
            </div>

            <div className={styles.postHeader}>
              {/* Header */}
              <h2>{post.header}</h2>

              {/* Date */}
              <time>{new Date(post.dateUploaded).toLocaleDateString()}</time>
            </div>
          </article>
        ))}
      </Grid>
    </main>
  );
}
