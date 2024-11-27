import Link from "next/link";
import styles from "./Logo.module.css";
import { DynamicHeader } from "@/sanity/schemaTypes/dynamicHeader";

interface LogoProps {
  dynamicText: DynamicHeader | null;
  defaultText?: string;
  className?: string;
}

export function Logo({
  dynamicText,
  defaultText = "doing ok",
  className,
}: LogoProps) {
  return (
    <h1 className={`${styles.logo} ${className}`}>
      <Link className="underline" href="/">
        Rose
      </Link>{" "}
      is{" "}
      <Link className="underline" href="/rose-is">
        {dynamicText?.replacableText || ""}
        <span className={styles.dynamicText}>{defaultText}</span>
      </Link>
    </h1>
  );
}
