import Link from "next/link";
import styles from "./Navigation.module.css";

export function Navigation() {
  const navItems = [
    { label: "Mood", href: "/mood" },
    { label: "Index", href: "/index" },
    { label: "About", href: "/about" },
  ];

  return (
    <ul className={styles.navList}>
      {navItems.map(({ label, href }) => (
        <NavItem key={href} href={href} label={label} />
      ))}
    </ul>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li className={styles.navItem}>
      <Link href={href} className="underline">
        {label}
      </Link>
    </li>
  );
}
