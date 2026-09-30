import ProductCard from "@/components/ProductCard";
import { getProducts, toSummary } from "@/lib/products";

const trendingIds = [6, 10, 25, 40, 7, 24, 18, 32, 2, 41];

// An endless, self-scrolling strip. The list is rendered twice and the track
// slides left by exactly one copy's width, so the loop has no visible seam.
// Hovering or tabbing into it pauses on the product under the cursor. The
// second copy is decorative only: hidden from screen readers and keyboard.
function ProductCarousel() {
  const trending = getProducts(trendingIds).map(toSummary);

  return (
    <section id="trending" className="py-16 md:py-24">
      <div className="container-page">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          Trending now
        </h2>
      </div>

      <div
        className="marquee mt-8 md:mt-12"
        style={{ "--marquee-duration": `${trending.length * 6}s` } as React.CSSProperties}
      >
        <div className="marquee-track flex w-max py-3">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex shrink-0 ${copy === 1 ? "marquee-copy" : ""}`}
              aria-hidden={copy === 1 || undefined}
              {...(copy === 1 ? { inert: "" } : {})}
            >
              {trending.map((product) => (
                // Spacing is padding, not gap, so both copies are exactly the
                // same width and -50% lands precisely on the seam.
                <li
                  key={product.id}
                  className="w-[64vw] shrink-0 pr-4 sm:w-[40vw] md:w-[19rem] md:pr-6"
                >
                  <ProductCard
                    product={product}
                    sizes="(min-width: 768px) 288px, (min-width: 640px) 40vw, 64vw"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;
