import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Regular Post", value: "regular" },
          { title: "Mood Post", value: "mood" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
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
        },
      ],
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const { document } = context;
          if (document?.contentType === "mood" && images && images.length > 1) {
            return "Mood entries can only have one image";
          }
          if (
            document?.contentType === "mood" &&
            (!images || images.length === 0)
          ) {
            return "Mood entries require one image";
          }
          return true;
        }),
    }),
    defineField({
      name: "moodType",
      title: "Mood Type",
      type: "string",
      options: {
        list: [
          { title: "Happy", value: "happy" },
          { title: "Sad", value: "sad" },
          { title: "Excited", value: "excited" },
          { title: "Calm", value: "calm" },
        ],
      },
      hidden: ({ document }) => document?.contentType !== "mood",
      validation: (Rule) =>
        Rule.custom((moodType, context) => {
          const { document } = context;
          if (document?.contentType === "mood" && !moodType) {
            return "Mood type is required for mood entries";
          }
          return true;
        }),
    }),
    defineField({
      name: "dateUploaded",
      title: "Date Uploaded",
      type: "date",
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
      type: "contentType",
      media: "images.0",
    },
    prepare({ title, type, media }) {
      return {
        title: title || "Untitled",
        subtitle: type === "mood" ? "🎭 Mood Entry" : "📝 Post Entry",
        media: media,
      };
    },
  },
});

export interface SanityImage {
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
    url: string;
    metadata: {
      dimensions: {
        aspectRatio: number;
        height: number;
        width: number;
      };
    };
  };
}

export enum ContentType {
  REGULAR = "regular",
  MOOD = "mood",
}

export interface Post {
  _id: string;
  _createdAt: string;
  contentType: ContentType;
  header: string;
  images: SanityImage[];
  moodType?: "happy" | "sad" | "excited" | "calm";
  dateUploaded: string;
  content: string;
  song?: {
    title: string;
    artist: string;
    spotifyId: string;
  };
}
