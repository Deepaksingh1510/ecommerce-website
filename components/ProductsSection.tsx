import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import ProductCard from "@/components/ProductCard";
import { getProducts, toSummary } from "@/lib/products";

const featuredIds = [1, 9, 22, 5, 39, 13, 28, 16];

function ProductsSection() {
  const featured = getProducts(featuredIds).map(toSummary);

  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          Featured products
        </h2>
        <Link
          href="/category/All"
          className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] text-ink-soft transition-colors hover:text-ink"
        >
          View all
          <PiArrowRight
            size={14}
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:mt-12 lg:grid-cols-4 lg:gap-x-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} className="reveal" />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
