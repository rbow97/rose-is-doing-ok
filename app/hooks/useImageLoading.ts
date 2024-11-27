import { useEffect, useState } from "react";
import { SanityImage } from "@/sanity/schemaTypes/post";

interface UseImageLoadingProps {
  images: SanityImage[];
  dependencies?: Array<string | number | boolean | null | undefined>;
}

export function useImageLoading({
  images,
  dependencies = [],
}: UseImageLoadingProps) {
  const [isReady, setIsReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Handle image loading
  useEffect(() => {
    const loadImages = async (): Promise<void> => {
      try {
        const imageLoadPromises = images.map((image) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve on error to prevent hanging
            img.src = image.asset.url;
          });
        });

        await Promise.all(imageLoadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [images]);

  // Set ready state when both images are loaded and dependencies are met
  useEffect(() => {
    if (imagesLoaded && dependencies.every(Boolean)) {
      setIsReady(true);
    }
  }, [imagesLoaded, dependencies]);

  return { isReady };
}
