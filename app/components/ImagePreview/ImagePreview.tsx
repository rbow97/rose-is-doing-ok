import Image from "next/image";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  image: string | null;
}

export function ImagePreview({ image }: ImagePreviewProps) {
  if (!image) return null;

  return (
    <div
      className={styles.imagePreviewContainer}
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
