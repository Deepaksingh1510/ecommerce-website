import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryGrid from "@/components/CategoryGrid";
import { categories, isCategory } from "@/lib/products";

type PageProps = {
  params: {
    category: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params: { category } }: PageProps): Metadata {
  return { title: category === "All" ? "All products" : category };
}

export default function CategoryPage({ params: { category } }: PageProps) {
  if (!isCategory(category)) notFound();
  return <CategoryGrid category={category} />;
}
