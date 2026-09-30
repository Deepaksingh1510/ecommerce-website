import Link from "next/link";
import CardMedia from "@/components/CardMedia";
import QuickAdd from "@/components/QuickAdd";
import { formatPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/products";

type Props = {
  product: ProductSummary;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// A framed card: the photo sits inside a slightly larger shell with a
// concentric radius, like a print in a mount. On hover the card lifts and
// the photo cross-fades to the product's second view.
function ProductCard({
  product,
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw",
  priority,
  className = "",
}: Props) {
  // className goes on a wrapper: an entrance animation (e.g. .reveal) keeps
  // its final transform applied, which would cancel the hover lift below.
  return (
    <div className={className}>
      <article className="group relative h-full rounded-[1.75rem] bg-surface p-1.5 ring-1 ring-line/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgb(var(--ink)/0.45)]">
        <Link href={`/products/${product.id}`} className="block rounded-[1.35rem]">
          <CardMedia
            images={product.images}
            alt={product.title}
            sizes={sizes}
            priority={priority}
          />
          <div className="px-2.5 pb-2.5 pt-3 sm:px-3 sm:pb-3">
            <p className="truncate text-xs font-medium text-ink-soft">
              {product.brand}
            </p>
            <h3 className="mt-0.5 line-clamp-2 min-h-[2.5em] font-sans text-[15px] font-medium leading-tight">
              {product.title}
            </h3>
            <p className="price mt-3 pr-12 font-display text-lg font-semibold tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>

        {/* Outside the link so it's a real button, not one nested in an anchor. */}
        <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5">
          <QuickAdd product={product} />
        </div>
      </article>
    </div>
  );
}

export default ProductCard;
