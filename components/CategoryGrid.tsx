"use client";
import React, { useState } from "react";
import productsData from "./../data/ProductData.json";
import { useRouter } from "next/navigation";
type Props = { category: string };

function CategoryGrid({ category }: Props) {
  const router = useRouter(); // Use the useNavigation hook
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigateToCategoryHome = () => {
    router.push("/category/Home"); // Function to navigate
  };
  const navigateToCategorySports = () => {
    router.push("/category/Sports"); // Function to navigate
  };
  const navigateToCategoryTech = () => {
    router.push("/category/Tech"); // Function to navigate
  };
  const navigateToCategoryKitchen = () => {
    router.push("/category/Kitchen"); // Function to navigate
  };
  const navigateToCategoryFragrance = () => {
    router.push("/category/Fragrance"); // Function to navigate
  };
  const navigateToCategoryAll = () => {
    router.push("/category/All"); // Function to navigate
  };
  const handleProductClick = (relatedProduct: any) => {
    setSelectedProduct(relatedProduct);
    router.push(`/products/${relatedProduct.id}`);
  };

  let displayedProducts = productsData;

  if (category !== "All") {
    displayedProducts = productsData.filter((p) => p.category === category);
  }

  return (
    <div className="justify-start p-3 max-w-7xl mx-auto overflow-hidden mt-6">
      <div className="flex justify-center">
        <h2
          className={`font-bold md:text-4xl text-2xl text-slate-700 my-5 underline`}
        >
          {category === "All" ? "All Products" : `${category} Products`}
        </h2>
      </div>
      <div className=" flex max-w-xl mx-auto mb-6 justify-center items-center">
        <div className="md:flex md:flex-row grid grid-cols-3 justify-evenly items-center md:space-x-4">
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 md:justify-center md:items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-md font-normal px-3"
              onClick={navigateToCategoryAll}
            >
              All
            </p>
          </div>
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 justify-center items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-md font-normal px-1"
              onClick={navigateToCategoryHome}
            >
              Home
            </p>
          </div>
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 justify-center items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-lg font-normal px-1"
              onClick={navigateToCategorySports}
            >
              Sports
            </p>
          </div>
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 justify-center items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-lg font-normal px-1"
              onClick={navigateToCategoryTech}
            >
              Tech
            </p>
          </div>
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 justify-center items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-lg font-normal px-1"
              onClick={navigateToCategoryKitchen}
            >
              Kitchen
            </p>
          </div>
          <div className="flex h-8 w-fit border-2 border-gray-300 hover:border-gray-500 justify-center items-center">
            <p
              className="cursor-pointer hover:underline decoration-1 text-lg font-normal px-1"
              onClick={navigateToCategoryFragrance}
            >
              Fragrance
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 justify-start scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl gap-5">
          {displayedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              onClick={() => handleProductClick(relatedProduct)}
              className="flex flex-col shadow-lg md:h-[350px] h-[200px] w-full border-2 bg-white hover:border-gray-800 hover:scale-105 duration-200 cursor-pointer border-gray-400 justify-center items-center"
            >
              <h3 className="text-center mb-4">{relatedProduct.title}</h3>
              <img
                className="md:h-[250px] md:w-[220px] h-[130px] w-[120px] object-contain"
                src={relatedProduct.mainImageUrl}
                alt={relatedProduct.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;
