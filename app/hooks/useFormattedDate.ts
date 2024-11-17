import { useEffect, useState } from "react";

export function useFormattedDate(date: string) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString());
  }, [date]);

  return formattedDate;
}
