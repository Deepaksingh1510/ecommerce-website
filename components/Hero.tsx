import Image from "next/image";
import Link from "next/link";
import { PiArrowRight, PiArrowUpRight } from "react-icons/pi";
import { getProductsByCategory, products, siteImages } from "@/lib/products";

// Six tiles that fill the grid exactly. Desktop (12 cols): Gaming 6x2, Tech
// 3x1, Fragrance 3x2, Home 3x1, then Kitchen and Sports side by side.
// Phone (2 cols): Gaming 2x2, then Fragrance runs two rows beside Tech/Home.
const tiles = [
  {
    category: "Gaming",
    image: siteImages.gaming,
    alt: "Gaming desk lit in purple",
    className: "col-span-2 row-span-2 md:col-span-6",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    category: "Tech",
    image: siteImages.tech,
    alt: "Laptop keyboard lit in purple",
    className: "col-span-1 row-span-1 md:col-span-3",
    sizes: "(min-width: 768px) 25vw, 50vw",
  },
  {
    category: "Fragrance",
    image: siteImages.fragrance,
    alt: "Perfume bottles catching golden light",
    className: "col-span-1 row-span-2 md:col-span-3",
    sizes: "(min-width: 768px) 25vw, 50vw",
  },
  {
    category: "Home",
    image: siteImages.home,
    alt: "Sunlit living room with a sofa and plants",
    className: "col-span-1 row-span-1 md:col-span-3",
    sizes: "(min-width: 768px) 25vw, 50vw",
  },
  {
    category: "Kitchen",
    image: siteImages.kitchen,
    alt: "Modern kitchen with an island",
    className: "col-span-1 row-span-1 md:col-span-6",
    sizes: "(min-width: 768px) 50vw, 50vw",
  },
  {
    category: "Sports",
    image: siteImages.sports,
    alt: "Runner on a city street",
    className: "col-span-1 row-span-1 md:col-span-6",
    sizes: "(min-width: 768px) 50vw, 50vw",
  },
] as const;

function Hero() {
  return (
    <section className="container-page pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <h1
          className="enter text-[2.6rem] font-semibold leading-[1] tracking-[-0.04em] md:col-span-8 md:text-7xl"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          Gaming, tech and fragrance,{" "}
          <span className="text-accent">delivered fast.</span>
        </h1>
        <div
          className="enter md:col-span-4 md:pb-2"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <p className="max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            {products.length} products people actually ask for, from the
            PlayStation 5 to Bleu de Chanel.
          </p>
          <Link href="/category/All" className="btn-primary group mt-6 pr-2">
            Shop all
            <span className="grid h-8 w-8 place-items-center rounded-full bg-on-accent/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              <PiArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 md:mt-14 md:auto-rows-[220px] md:grid-cols-12 md:gap-4">
        {tiles.map((tile, index) => (
          <Link
            key={tile.category}
            href={`/category/${tile.category}`}
            className={`group relative overflow-hidden rounded-3xl bg-tile ${tile.className}`}
          >
            <Image
              src={tile.image.src}
              alt={tile.alt}
              fill
              priority={index === 0}
              sizes={tile.sizes}
              placeholder="blur"
              blurDataURL={tile.image.blurDataURL}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
              <div>
                <span className="block font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {tile.category}
                </span>
                <span className="price text-sm text-white/75">
                  {getProductsByCategory(tile.category).length} products
                </span>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <PiArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Hero;
