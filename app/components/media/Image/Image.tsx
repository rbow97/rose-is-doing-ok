import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends Omit<NextImageProps, "alt"> {
  alt: string;
  className?: string;
}

export function BaseImage({ alt, className, ...props }: ImageProps) {
  return (
    <NextImage
      alt={alt}
      className={className}
      sizes="(max-width: 768px) 100vw, 50vw"
      quality={95}
      {...props}
    />
  );
}
