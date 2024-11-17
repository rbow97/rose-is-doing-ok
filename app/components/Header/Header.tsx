"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <h1>
          <Link className="underline" href="/">
            Rose
          </Link>{" "}
          is{" "}
          <Link className="underline" href="/roseis">
            doing ok
          </Link>
        </h1>
        {/* <div className={styles.moodIcons}>
          <Image src="/sad.svg" alt="sad" width={16} height={16} />
          <Image src="/neutral.svg" alt="neutral" width={16} height={16} />
          <Image src="/calm.svg" alt="calm" width={16} height={16} />
          <Image src="/happy.svg" alt="happy" width={16} height={16} />
        </div> */}
        <ul>
          <li className="underline">
            <a href="/mood">Mood</a>
          </li>
          <li className="underline">
            <a href="/index">Index</a>
          </li>
          <li className="underline">
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
