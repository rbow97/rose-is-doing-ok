import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "isLandscape",
              title: "Is Landscape",
              type: "boolean",
              description:
                "Check if image should display in landscape orientation",
              initialValue: false,
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "moodType",
      title: "Mood Type",
      type: "string",
      options: {
        list: [
          { title: "Happy", value: "happy" },
          { title: "Sad", value: "sad" },
          { title: "Neutral", value: "neutral" },
          { title: "Calm", value: "calm" },
        ],
      },
    }),
    defineField({
      name: "dateUploaded",
      title: "Date Uploaded",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
    }),
    defineField({
      name: "song",
      title: "Song",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Song Title",
          type: "string",
        }),
        defineField({
          name: "artist",
          title: "Artist",
          type: "string",
        }),
        defineField({
          name: "spotifyId",
          title: "Spotify Track ID",
          type: "string",
          description:
            'The ID from the Spotify track URL (e.g., "11dFghVXANMlKmJXsNCbNl")',
          validation: (Rule) =>
            Rule.regex(/^[a-zA-Z0-9]{22}$/).warning(
              "Must be a valid Spotify track ID"
            ),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "header",
      mood: "moodType",
      media: "images.0",
    },
    prepare({ title, mood, media }) {
      return {
        title: title || "Untitled",
        subtitle: mood ? `Mood: ${mood}` : "Post Entry",
        media: media,
      };
    },
  },
});

export interface SanityImage {
  _key: string;
  isLandscape: boolean;
  asset: {
    _ref: string;
    _type: "reference";
    url: string;
    alt: string;
    lqip: string;
    metadata: {
      dimensions: {
        aspectRatio: number;
        height: number;
        width: number;
      };
    };
  };
}

export type MoodType = "happy" | "sad" | "calm" | "neutral";

export interface Post {
  _id: string;
  _createdAt: string;
  header: string;
  images: SanityImage[];
  moodType?: MoodType;
  dateUploaded: string;
  content: string;
  song?: {
    title: string;
    artist: string;
    spotifyId: string;
  };
}
