import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, toSummary, type Product } from "@/lib/products";

type Props = { product: Product };

function RelatedItems({ product }: Props) {
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="container-page py-16 md:py-24">
      <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
        More in {product.category}
      </h2>

      {relatedProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={toSummary(relatedProduct)}
              className="reveal"
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-ink-soft">
          This is the only {product.category.toLowerCase()} product right now.{" "}
          <Link
            href="/category/All"
            className="text-ink underline underline-offset-4"
          >
            Browse all products
          </Link>
        </p>
      )}
    </section>
  );
}

export default RelatedItems;
