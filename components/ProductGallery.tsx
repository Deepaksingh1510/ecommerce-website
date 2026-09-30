"use client";
import { useRef, useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import ProductImage from "@/components/ProductImage";
import type { ImageAsset } from "@/lib/products";

type Props = { title: string; images: ImageAsset[] };

// One large stage plus thumbnails (a column beside it from md up). Both
// images stay mounted and cross-fade, so switching is instant. Touch users
// can swipe; keyboard users can use the arrow buttons or ←/→ on the stage.
function ProductGallery({ title, images }: Props) {
  const [selected, setSelected] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const count = images.length;
  const go = (delta: number) => setSelected((i) => (i + delta + count) % count);
  const altFor = (index: number) =>
    index === 0 ? title : `${title}, view ${index + 1}`;

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      <div
        role="group"
        aria-label="Choose image"
        className="hidden shrink-0 flex-col gap-3 md:flex"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`Show image ${index + 1} of ${count}`}
            aria-pressed={index === selected}
            className={`relative h-24 w-20 overflow-hidden rounded-2xl bg-tile transition-[opacity,box-shadow] duration-200 ${
              index === selected
                ? "opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-canvas"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <ProductImage image={image} alt="" sizes="80px" />
          </button>
        ))}
      </div>

      <div
        className="group/stage relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-tile md:max-h-[min(78vh,760px)]"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} images`}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (swipeStart.current === null) return;
          const distance = event.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            aria-hidden={index !== selected}
            className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
              index === selected ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          >
            <ProductImage
              image={image}
              alt={altFor(index)}
              priority={index === 0}
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <p
              aria-live="polite"
              className="price absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
            >
              {selected + 1} / {count}
            </p>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {[
                { delta: -1, label: "Previous image", Icon: PiCaretLeft },
                { delta: 1, label: "Next image", Icon: PiCaretRight },
              ].map(({ delta, label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(delta)}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-zinc-900 shadow-[0_6px_20px_-8px_rgb(0_0_0/0.5)] backdrop-blur-md transition-transform duration-150 ease-out active:scale-[0.92]"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;
