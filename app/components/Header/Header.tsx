import { getMostRecentDynamicHeader } from "@/utils/sanity.utils";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";
import styles from "./Header.module.css";

export async function Header() {
  const dynamicHeader = await getMostRecentDynamicHeader();

  return (
    <header className={styles.header}>
      <nav>
        <Logo dynamicText={dynamicHeader} />
        <Navigation />
      </nav>
    </header>
  );
}
