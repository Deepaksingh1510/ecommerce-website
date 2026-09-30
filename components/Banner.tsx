import Image from "next/image";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { siteImages } from "@/lib/products";

function Banner() {
  return (
    <section className="container-page py-8 md:py-12">
      <div className="reveal grid overflow-hidden rounded-3xl bg-tile md:grid-cols-12">
        <div className="flex flex-col justify-center px-6 py-12 md:col-span-5 md:px-12 md:py-20">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Embrace your space
          </h2>
          <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-ink-soft">
            Discover the art of harmonious living.
          </p>
          <div className="mt-8">
            <Link href="/category/Home" className="btn-secondary group">
              Shop home
              <PiArrowRight
                size={16}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[440px]">
          <Image
            src={siteImages.banner.src}
            alt="Bright dining room with a wooden table"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            placeholder="blur"
            blurDataURL={siteImages.banner.blurDataURL}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
