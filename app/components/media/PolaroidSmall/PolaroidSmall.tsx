import clsx from "clsx";
import { BaseImage } from "../Image/Image";
import styles from "./PolaroidSmall.module.css";

interface PolaroidSmallProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  children?: React.ReactNode;
}

export function PolaroidSmall({
  src,
  alt,
  width,
  height,
  className,
  children,
}: PolaroidSmallProps) {
  const aspectRatio = width / height;
  const isLandscape = aspectRatio >= 1;

  return (
    <div
      className={clsx(
        styles.wrapper,
        isLandscape ? styles.landscape : styles.portrait,
        className
      )}
    >
      <BaseImage
        src={src}
        alt={alt}
        width={isLandscape ? 300 : 225}
        height={isLandscape ? 225 : 300}
        quality={95}
        className={styles.image}
      />
      {children}
    </div>
  );
}
