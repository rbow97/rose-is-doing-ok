"use client";

import { useScrollPosition } from "@/app/hooks/useScrollPosition";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../../Navigation/Navigation";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { DynamicHeader } from "@/sanity/schemaTypes/dynamicHeader";
import { getMostRecentDynamicHeader } from "@/utils/sanity.utils";

export function Header() {
  const [dynamicHeader, setDynamicHeader] = useState<DynamicHeader | null>(
    null
  );
  const isScrolled = useScrollPosition();

  useEffect(() => {
    async function fetchHeader() {
      const header = await getMostRecentDynamicHeader();
      setDynamicHeader(header);
    }
    fetchHeader();
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav>
        <Logo
          className={`${styles.logo} ${dynamicHeader?.replacableText ? "fadeIn" : ""}`}
          dynamicText={dynamicHeader}
        />
        <Navigation />
      </nav>
    </header>
  );
}
