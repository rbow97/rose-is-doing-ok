import Image from "next/image";
import styles from "./ImagePreview.module.css";
import clsx from "clsx";

interface ImagePreviewProps {
  image: string | null;
  className?: string;
}

export function ImagePreview({ image, className }: ImagePreviewProps) {
  if (!image) return null;

  return (
    <div
      className={clsx(styles.imagePreviewContainer, className)}
      role="complementary"
      aria-label="Image preview"
    >
      <div className={styles.imagePreview}>
        <Image
          src={image}
          alt="Preview"
          width={300}
          height={300}
          quality={95}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
