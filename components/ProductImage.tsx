import Image from "next/image";
import type { ImageAsset } from "@/lib/products";

type Props = {
  image: ImageAsset;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Only usable when rendered from a client component. */
  onLoad?: () => void;
  loading?: "eager" | "lazy";
};

// Every catalogue image is a photograph, so they all fill their frame the
// same way. The parent must be relatively positioned with a set aspect ratio.
function ProductImage({
  image,
  alt,
  sizes,
  priority,
  className = "",
  onLoad,
  loading,
}: Props) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      onLoad={onLoad}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={`object-cover ${className}`}
    />
  );
}

export default ProductImage;
