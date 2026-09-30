import Link from "next/link";
import {
  PiArrowCounterClockwise,
  PiCaretDown,
  PiCaretRight,
  PiLockSimple,
  PiSealCheck,
  PiTruck,
} from "react-icons/pi";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { storePolicies } from "@/lib/store";

type Props = { product: Product };

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function ProductInfo({ product }: Props) {
  const { freeDeliveryThreshold, deliveryDays, returnDays } = storePolicies;
  const sections = [
    { title: "Description", body: <p>{product.details}</p>, open: true },
    {
      title: "Specifications",
      body: (
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2">
          <dt className="text-ink-soft">Brand</dt>
          <dd>{product.brand}</dd>
          <dt className="text-ink-soft">Category</dt>
          <dd>{product.category}</dd>
          <dt className="text-ink-soft">Key features</dt>
          <dd>{product.highlights.join(", ")}</dd>
        </dl>
      ),
    },
    {
      title: "Delivery & returns",
      body: (
        <p>
          Free UK delivery on orders over {formatPrice(freeDeliveryThreshold)},
          usually arriving in {deliveryDays}. Changed your mind? Return unused
          items within {returnDays} days.
        </p>
      ),
    },
  ];

  return (
    <section className="relative isolate">
      {/* A soft wash of the product's own colours behind the top of the page,
          made from its tiny blur placeholder, so every page gets its own tint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-cover bg-center opacity-30 blur-3xl saturate-150 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-25"
        style={{ backgroundImage: `url(${product.images[0].blurDataURL})` }}
      />

      <div className="container-page pt-6 md:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-ink-soft">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <PiCaretRight size={12} aria-hidden />
            <li>
              <Link
                href={`/category/${product.category}`}
                className="transition-colors hover:text-ink"
              >
                {product.category}
              </Link>
            </li>
            <PiCaretRight size={12} aria-hidden />
            <li aria-current="page" className="truncate text-ink">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-8 md:mt-8 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-7">
            <ProductGallery title={product.title} images={product.images} />
          </div>

          <div className="md:col-span-5 md:py-2">
            <div className="enter flex items-center gap-2" style={stagger(0)}>
              <span className="text-sm font-medium">{product.brand}</span>
              <span className="h-1 w-1 rounded-full bg-ink-soft/50" aria-hidden />
              <span className="text-sm text-ink-soft">{product.category}</span>
            </div>
            <h1
              className="enter mt-2 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[3.4rem]"
              style={stagger(0)}
            >
              {product.title}
            </h1>
            <p className="enter mt-5 flex items-baseline gap-2" style={stagger(1)}>
              <span className="price font-display text-3xl font-semibold tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-ink-soft">incl. VAT</span>
            </p>

            <ul className="enter mt-7 grid grid-cols-3 gap-2" style={stagger(2)}>
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex flex-col gap-2 rounded-2xl bg-surface/80 p-3 text-[13px] leading-snug ring-1 ring-line/[0.06]"
                >
                  <PiSealCheck size={18} className="text-accent" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="enter mt-7" style={stagger(3)}>
              <AddToCart
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  mainImageUrl: product.images[0].src,
                }}
              />
            </div>

            <ul
              className="enter mt-6 grid gap-2.5 text-sm text-ink-soft sm:grid-cols-3 sm:gap-3"
              style={stagger(4)}
            >
              {[
                { Icon: PiTruck, text: `Free delivery over ${formatPrice(freeDeliveryThreshold)}` },
                { Icon: PiArrowCounterClockwise, text: `${returnDays}-day returns` },
                { Icon: PiLockSimple, text: "Secure checkout" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon size={18} className="shrink-0 text-ink" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>

            <div
              className="enter mt-8 divide-y divide-line/[0.08] border-y border-line/[0.08]"
              style={stagger(5)}
            >
              {sections.map(({ title, body, open }) => (
                <details key={title} open={open} className="group/section">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium [&::-webkit-details-marker]:hidden">
                    {title}
                    <PiCaretDown
                      size={16}
                      aria-hidden
                      className="text-ink-soft transition-transform duration-200 ease-out group-open/section:rotate-180"
                    />
                  </summary>
                  <div className="pb-5 text-[15px] leading-relaxed text-ink-soft">
                    {body}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
