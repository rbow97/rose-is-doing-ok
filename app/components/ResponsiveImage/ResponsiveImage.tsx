import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio: number;
  blurDataURL?: string;
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  blurDataURL,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const isLandscape = aspectRatio >= 1;

  return (
    <Image
      src={src}
      alt={alt}
      width={isLandscape ? 1200 : 800}
      height={isLandscape ? 800 : 1200}
      quality={95}
      priority={priority}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
