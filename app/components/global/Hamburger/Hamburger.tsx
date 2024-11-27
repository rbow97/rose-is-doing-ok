import styles from "./Hamburger.module.css";

interface HamburgerProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

export function Hamburger({ toggleMenu, isOpen }: HamburgerProps) {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
