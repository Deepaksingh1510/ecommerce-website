import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Banner />
      <ProductCarousel />
    </>
  );
}
