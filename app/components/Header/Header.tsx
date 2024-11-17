"use client";

import Image from "next/image";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a>
          Rose is <span className="underline">doing ok</span>
        </a>
        <Image src="/moods.svg" alt="mood icons" width={88} height={16} />
        <ul>
          <li className="underline">Mood</li>
          <li className="underline">Index</li>
          <li className="underline">About</li>
        </ul>
      </nav>
    </header>
  );
}
