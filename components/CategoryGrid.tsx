import Link from "next/link";
import ProductListing from "@/components/ProductListing";
import {
  categories,
  getProductsByCategory,
  toSummary,
  type Category,
} from "@/lib/products";

type Props = { category: Category };

function CategoryGrid({ category }: Props) {
  const displayedProducts = getProductsByCategory(category);

  return (
    <section className="container-page pb-8 pt-10 md:pt-16">
      <h1 className="text-4xl font-semibold tracking-[-0.035em] md:text-6xl">
        {category === "All" ? "All products" : category}
      </h1>

      <nav
        aria-label="Categories"
        className="rail -mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:mt-8"
      >
        <ul className="flex gap-2 pb-6">
          {categories.map((item) => {
            const active = item === category;
            const count = getProductsByCategory(item).length;
            return (
              <li key={item} className="shrink-0">
                <Link
                  href={`/category/${item}`}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200 ${
                    active
                      ? "bg-ink text-canvas"
                      : "bg-line/[0.05] text-ink-soft hover:bg-line/10 hover:text-ink"
                  }`}
                >
                  {item}
                  <span
                    className={`price text-xs ${
                      active ? "text-canvas/60" : "text-ink-soft/70"
                    }`}
                  >
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {displayedProducts.length > 0 ? (
        <ProductListing products={displayedProducts.map(toSummary)} />
      ) : (
        <div className="mt-4 rounded-3xl bg-tile px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold tracking-tight">
            Nothing in {category} yet
          </p>
          <p className="mt-2 text-ink-soft">
            New products are added regularly. Browse the full range meanwhile.
          </p>
          <Link href="/category/All" className="btn-primary mt-6">
            All products
          </Link>
        </div>
      )}
    </section>
  );
}

export default CategoryGrid;
