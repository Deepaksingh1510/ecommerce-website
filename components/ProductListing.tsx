"use client";
import { useMemo, useState } from "react";
import { PiCaretDown } from "react-icons/pi";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/products";

const sortOptions = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
} as const;

type SortKey = keyof typeof sortOptions;

function sortProducts(products: ProductSummary[], sort: SortKey) {
  switch (sort) {
    case "newest":
      return [...products].sort((a, b) => b.id - a.id);
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}

type Props = { products: ProductSummary[] };

function ProductListing({ products }: Props) {
  const [sort, setSort] = useState<SortKey>("featured");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-line/[0.08] pb-4">
        <p className="price text-sm text-ink-soft">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <label className="relative flex items-center gap-2 text-sm">
          <span className="text-ink-soft">Sort by</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-9 appearance-none rounded-full bg-line/[0.05] pl-4 pr-9 font-medium text-ink transition-colors hover:bg-line/10"
          >
            {Object.entries(sortOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <PiCaretDown
            size={14}
            aria-hidden
            className="pointer-events-none absolute right-3.5 text-ink-soft"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {sorted.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
            // Scroll-driven reveal: cards already on screen at load stay fully
            // visible, so the largest image isn't held back by a fade-in.
            className="reveal"
          />
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
