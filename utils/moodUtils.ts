import { MoodType, Post, SanityImage } from "@/sanity/schemaTypes/post";

interface MoodEntry {
  date: string;
  id: string;
  mood: {
    type: MoodType;
    image?: SanityImage;
  };
}

export function transformMoodData(posts: Post[]): MoodEntry[] {
  const moodsByDate = posts
    .filter((post) => post.moodType)
    .reduce(
      (
        acc: {
          [key: string]: {
            mood: MoodType;
            image?: SanityImage;
            id: string;
          };
        },
        post: Post
      ) => {
        const date = new Date(post.dateUploaded).toLocaleDateString("en-GB");
        acc[date] = {
          mood: post.moodType || "neutral",
          image: post.images?.reverse()[0],
          id: post._id,
        };
        return acc;
      },
      {}
    );

  return Object.entries(moodsByDate).map(([date, mood]) => ({
    date,
    id: mood.id,
    mood: {
      type: mood.mood,
      image: mood.image,
    },
  }));
}
