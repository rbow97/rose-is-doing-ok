import clsx from "clsx";
import { BaseImage } from "../Image/Image";
import styles from "./Polaroid.module.css";

interface PolaroidProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
}

export function Polaroid({
  src,
  alt,
  width,
  height,
  caption,
  className,
}: PolaroidProps) {
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
      <div className={styles.imageContainer}>
        <BaseImage
          src={src}
          alt={alt}
          width={isLandscape ? 1200 : 800}
          height={isLandscape ? 800 : 1200}
          className={styles.image}
        />
      </div>
      {caption && (
        <div className={styles.caption}>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
}
