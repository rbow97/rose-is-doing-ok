"use client";

import { useScrollPosition } from "@/app/hooks/useScrollPosition";
import { useHeaderScroll } from "@/app/hooks/useHeaderScroll";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../../Navigation/Navigation";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { DynamicHeader } from "@/sanity/schemaTypes/dynamicHeader";
import { getMostRecentDynamicHeader } from "@/utils/sanity.utils";
import { Hamburger } from "../Hamburger/Hamburger";
import { Divider } from "../Divider/Divider";

export function Header() {
  const [dynamicHeader, setDynamicHeader] = useState<DynamicHeader | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const { isHidden } = useHeaderScroll({ threshold: 150 });
  const isScrolled = useScrollPosition();

  useEffect(() => {
    async function fetchHeader() {
      const header = await getMostRecentDynamicHeader();
      setDynamicHeader(header);
    }
    fetchHeader();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Mood", href: "/mood" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`
        ${styles.header} 
        ${isScrolled ? styles.scrolled : ""} 
        ${isHidden ? styles.hidden : ""}
        ${isOpen ? styles.overlayOpen : ""}
      `}
      >
        <nav>
          <Logo
            className={`${styles.logo} ${dynamicHeader?.replacableText ? "fadeIn" : ""}`}
            dynamicText={dynamicHeader}
          />
          <div className={styles.desktopNav}>
            <Navigation />
          </div>
          <div className={styles.mobileNav}>
            <Hamburger toggleMenu={toggleMenu} isOpen={isOpen} />
          </div>
        </nav>
      </header>
      {isOpen && (
        <div className={styles.overlay}>
          <ul className={styles.navList}>
            {navItems.map(({ label, href }) => (
              <li key={href} className={styles.navItem}>
                <a href={href} onClick={() => setIsOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Divider />
        </div>
      )}
    </>
  );
}
