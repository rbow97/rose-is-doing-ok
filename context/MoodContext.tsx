"use client";

import { Post } from "@/sanity/schemaTypes/post";
import { createContext, useContext, useState } from "react";

type MoodColours = {
  [key: string]: string;
};

const moodColours: MoodColours = {
  happy: "var(--mood-happy)",
  sad: "var(--mood-sad)",
  calm: "var(--mood-calm)",
  neutral: "var(--mood-neutral)",
};

interface MoodContextType {
  currentMoodColour: string;
  updateMoodFromPosts: (posts: Post[]) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [currentMoodColour, setCurrentMoodColour] = useState(
    moodColours.neutral
  );

  const updateMoodFromPosts = (posts: Post[]) => {
    const latestPostWithMood = posts
      .sort(
        (a, b) =>
          new Date(b.dateUploaded).getTime() -
          new Date(a.dateUploaded).getTime()
      )
      .find((post) => post.moodType);

    if (latestPostWithMood?.moodType) {
      const moodColour =
        moodColours[latestPostWithMood.moodType.toLowerCase()] ||
        moodColours.neutral;
      setCurrentMoodColour(moodColour);
      document.documentElement.style.setProperty(
        "--current-mood-colour",
        moodColour
      );
    }
  };

  return (
    <MoodContext.Provider value={{ currentMoodColour, updateMoodFromPosts }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
