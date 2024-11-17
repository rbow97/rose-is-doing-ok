import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/schemaTypes/post";

export async function getAllPosts(): Promise<Post[]> {
  return await client.fetch(
    `
    *[_type == "post"] | order(dateUploaded desc) {
      _id,
      contentType,
      _createdAt,
      type,
      header,
      "images": images[] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      moodType,
      dateUploaded,
      content,
      song
    }
  `,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getPostById(id: string): Promise<Post> {
  return await client.fetch(
    `
    *[_type == "post" && _id == $id][0] {
      _id,
      _createdAt,
      type,
      header,
      "images": images[] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      moodType,
      dateUploaded,
      content,
      song
    }
  `,
    { id }
  );
}

export async function getPostsByType(
  type: "regular" | "mood"
): Promise<Post[]> {
  return await client.fetch(
    `
    *[_type == "post" && type == $type] | order(dateUploaded desc) {
      _id,
      _createdAt,
      type,
      header,
      "images": images[] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      moodType,
      dateUploaded,
      content,
      song
    }
  `,
    { type }
  );
}
