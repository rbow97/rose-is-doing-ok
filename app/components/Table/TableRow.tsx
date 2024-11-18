import { useRouter } from "next/navigation";
import styles from "./Table.module.css";

interface TableEntry {
  id: string;
  date: string;
  mood: {
    color: string;
    image?: string;
  };
}

interface TableRowProps {
  entry: TableEntry;
  onHover: (image: string | null) => void;
}

export function TableRow({ entry, onHover }: TableRowProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      router.push(`/post/${entry.id}`);
    }
  };

  return (
    <tr
      onClick={() => router.push(`/post/${entry.id}`)}
      onMouseEnter={() => onHover(entry.mood.image || null)}
      onMouseLeave={() => onHover(null)}
      className={styles.tableRow}
      role="link"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <td className={styles.tableCell}>
        <span className={styles.datePart}>{entry.date}</span>
      </td>
      <td>
        <MoodIndicator color={entry.mood.color} />
      </td>
    </tr>
  );
}

function MoodIndicator({ color }: { color: string }) {
  return (
    <span
      className={styles.mood}
      style={{ backgroundColor: color }}
      role="img"
      aria-label="Mood indicator"
    />
  );
}
