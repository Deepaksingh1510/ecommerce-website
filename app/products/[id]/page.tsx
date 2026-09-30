import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductInfo from "@/components/ProductInfo";
import RelatedItems from "@/components/RelatedItems";
import { getProduct, products } from "@/lib/products";

type PageProps = {
  params: {
    id: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export function generateMetadata({ params: { id } }: PageProps): Metadata {
  const product = getProduct(id);
  if (!product) return {};
  return {
    title: product.title,
    description: product.details.slice(0, 155),
    openGraph: { images: [product.images[0].src] },
  };
}

export default function ProductPage({ params: { id } }: PageProps) {
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <ProductInfo product={product} />
      <RelatedItems product={product} />
    </>
  );
}
