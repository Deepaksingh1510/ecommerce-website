"use client";
import { store } from "@/app/store";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Provider } from "react-redux";
type PageProps = {
  params: {
    category: string;
  };
};
export default function Home({ params: { category } }: PageProps) {
  return (
    <Provider store={store}>
      <body className=" h-full bg-gray-100">
        <Header />
        <CategoryGrid category={category} />
      </body>
    </Provider>
  );
}
