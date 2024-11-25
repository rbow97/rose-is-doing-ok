import NextImage, { ImageProps as NextImageProps } from "next/image";
import styles from "./Image.module.css";

interface ImageProps extends Omit<NextImageProps, "alt"> {
  alt: string;
  className?: string;
}

export function BaseImage({ alt, className, ...props }: ImageProps) {
  return (
    <div className={styles.wrapper}>
      <NextImage
        alt={alt}
        className={className}
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={95}
        {...props}
      />
    </div>
  );
}
