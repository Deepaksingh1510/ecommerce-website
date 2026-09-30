"use client";
import { useState } from "react";
import ProductImage from "@/components/ProductImage";
import type { ImageAsset } from "@/lib/products";

type Props = {
  images: ImageAsset[];
  alt: string;
  sizes: string;
  priority?: boolean;
};

// Product card image that cross-fades to the second view on hover. The second
// image isn't requested until the first hover, so grids only download what's
// visible, and it only fades in once it has actually loaded.
function CardMedia({ images, alt, sizes, priority }: Props) {
  const [armed, setArmed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [secondLoaded, setSecondLoaded] = useState(false);
  const showSecond = hovered && secondLoaded;

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-tile"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        setArmed(true);
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <ProductImage
        image={images[0]}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {armed && images[1] && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            showSecond ? "opacity-100" : "opacity-0"
          }`}
        >
          <ProductImage
            image={images[1]}
            alt=""
            sizes={sizes}
            // Only mounted once hovered, so fetch it straight away.
            loading="eager"
            onLoad={() => setSecondLoaded(true)}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      {images.length > 1 && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-3 flex justify-center gap-1"
        >
          {images.map((image, index) => (
            <span
              key={image.src}
              className={`h-[3px] w-4 rounded-full transition-colors duration-300 ${
                (showSecond ? 1 : 0) === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardMedia;
