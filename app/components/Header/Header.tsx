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
        <div className={styles.moodIcons}>
          <Image src="/sad.svg" alt="sad" width={16} height={16} />
          <Image src="/neutral.svg" alt="neutral" width={16} height={16} />
          <Image src="/calm.svg" alt="calm" width={16} height={16} />
          <Image src="/happy.svg" alt="happy" width={16} height={16} />
        </div>
        <ul>
          <li className="underline">Mood</li>
          <li className="underline">Index</li>
          <li className="underline">About</li>
        </ul>
      </nav>
    </header>
  );
}
