"use client";
import { store } from "@/app/store";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductInfo from "@/components/ProductInfo";
import RelatedItems from "@/components/RelatedItems";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
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

        <ProductInfo id={id} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/*       <Footer /> */}
        <RelatedItems id={id} />
      </body>
    </Provider>
  );
}
