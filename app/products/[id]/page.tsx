"use client";
import { store } from "@/app/store";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
/* import ProductInfo from "@/components/ProductInfo"; */
import { Provider } from "react-redux";
type PageProps = {
  params: {
    id: string;
  };
};
export default function Home({ params: { id } }: PageProps) {
  return (
    <Provider store={store}>
      <body className=" h-full bg-gray-100">
        <Header />
        {/*         <ProductInfo id={id} /> */}
        {/*       <Footer /> */}
      </body>
    </Provider>
  );
}
