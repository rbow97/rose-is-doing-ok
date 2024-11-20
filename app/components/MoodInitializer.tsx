"use client";

import { fetchMostRecentMood } from "@/utils/utils";
import { useEffect } from "react";

const moodColours = {
  happy: "var(--mood-happy)",
  sad: "var(--mood-sad)",
  calm: "var(--mood-calm)",
  neutral: "var(--mood-neutral)",
};

export function MoodInitializer() {
  useEffect(() => {
    async function setMoodColour() {
      const { data: mood } = await fetchMostRecentMood();
      if (!mood) return;

      const moodColour =
        moodColours[mood as keyof typeof moodColours] || moodColours.neutral;
      document.documentElement.style.setProperty(
        "--current-mood-colour",
        moodColour
      );
    }

    setMoodColour();
  }, []);

  return null;
}
