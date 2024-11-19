"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Mood", href: "/mood" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "About", href: "/about" },
  ];

  return (
    <ul className={styles.navList}>
      {navItems.map(({ label, href }) => (
        <NavItem
          key={href}
          href={href}
          label={label}
          isActive={pathname === href}
        />
      ))}
    </ul>
  );
}

function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <li className={styles.navItem}>
      <Link
        href={href}
        className={`${isActive ? styles.active : ""} underline`}
      >
        {label}
      </Link>
    </li>
  );
}
