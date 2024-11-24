import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  blurDataURL,
  className,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={150}
      quality={95}
      priority={priority}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
