import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import productsData from "./../data/ProductData.json";

type Props = {};

function ProductsSection({}: Props) {
  const router = useRouter(); // Use the useNavigation hook
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle product selection and navigation
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    router.push(`/products/${product.id}`);
  };

  // Limit the number of displayed items to 8
  const displayedProducts = productsData.slice(0, 8);

  return (
    <div className="justify-start p-3 mt-12 max-w-7xl mx-auto ">
      <h1
        className={`font-bold md:text-4xl text-2xl justify-start text-slate-700 my-5 underline `}
      >
        Featured Products
      </h1>
      {/* Products grid */}
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 ">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col shadow-lg md:h-[350px] h-[200px] w-full border-2 bg-white hover:border-gray-800 hover:scale-105 duration-200 cursor-pointer border-gray-400"
            onClick={() => handleProductClick(product)}
          >
            <div className="flex justify-center items-center md:mt-5 mt-2 w-full">
              <img
                className="md:h-[250px] md:w-[220px] h-[130px] w-[120px] object-contain"
                src={product.mainImageUrl}
                alt={`Product-${product.id}`}
              />
            </div>
            <div className="flex flex-col justify-start mt-2 ml-2">
              <p className="md:text-lg text-sm font-normal ">{product.title}</p>
              <p className="md:text-xl text-sm font-bold">£{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsSection;
