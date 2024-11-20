import { client } from "@/sanity/lib/client";
import { DynamicHeader } from "@/sanity/schemaTypes/dynamicHeader";
import { Post } from "@/sanity/schemaTypes/post";

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] {
      _id,
      _createdAt,
      contentType,
      header,
      "images": images[]{
        _key,
        "asset": {
          "_ref": asset._ref,
          "_type": asset._type,
          "url": asset->url + "?w=1200&q=95",
          "lqip": asset->metadata.lqip,
          "metadata": {
            "dimensions": {
              "aspectRatio": asset->metadata.dimensions.aspectRatio,
              "height": asset->metadata.dimensions.height,
              "width": asset->metadata.dimensions.width
            }
          }
        }
      },
      moodType,
      dateUploaded,
      content,
      song
    } | order(dateUploaded desc)`
  );
}

export async function getPostById(id: string): Promise<Post> {
  return client.fetch(
    `*[_type == "post" && _id == $id][0]{
      _id,
      _createdAt,
      contentType,
      header,
      "images": images[]{
        _key,
        "asset": {
          "_ref": asset._ref,
          "_type": asset._type,
          "url": asset->url + "?w=1200&q=95",
          "lqip": asset->metadata.lqip,
          "metadata": {
            "dimensions": {
              "aspectRatio": asset->metadata.dimensions.aspectRatio,
              "height": asset->metadata.dimensions.height,
              "width": asset->metadata.dimensions.width
            }
          }
        }
      },
      moodType,
      dateUploaded,
      content,
      song
    }`,
    { id }
  );
}

export async function getMostRecentMood(): Promise<string | null> {
  return client
    .fetch(
      `*[_type == "post" && defined(moodType)] | order(dateUploaded desc)[0] {
        moodType
      }`
    )
    .then((result) => result?.moodType?.toLowerCase() || null);
}



export async function getPostsByType(
  type: "regular" | "mood"
): Promise<Post[]> {
  return client.fetch(
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

export async function getMostRecentDynamicHeader(): Promise<DynamicHeader> {
  return client.fetch(
    `*[_type == "dynamicHeader"][0]{
      _id,
      _createdAt,
      replacableText
    }`
  );
}

export async function getDynamicHeaders(): Promise<DynamicHeader[]> {
  return client.fetch(
    `*[_type == "dynamicHeader"] {
      _id,
      _createdAt,
      replacableText
    } | order(_createdAt desc)`
  );
}
