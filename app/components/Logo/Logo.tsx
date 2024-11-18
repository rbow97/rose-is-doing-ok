import Link from "next/link";
import styles from "./Logo.module.css";

export function Logo() {
  return (
    <h1 className={styles.logo}>
      <Link className="underline" href="/">
        Rose
      </Link>{" "}
      is{" "}
      <Link className="underline" href="/roseis">
        doing ok
      </Link>
    </h1>
  );
}
