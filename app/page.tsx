"use client";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import ProductsSection from "@/components/ProductsSection";
import Image from "next/image";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  return (
    <Provider store={store}>
      <body className=" h-full bg-gray-100">
        <Header />
        <Hero />
        <ProductsSection />
        <Banner />
        <ProductCarousel />
        <Footer />
      </body>
    </Provider>
  );
}
