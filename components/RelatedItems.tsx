"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import productsData from "./../data/ProductData.json";

type Props = { id: string };

function RelatedItems({ id }: Props) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    router.push(`/products/${product.id}`);
  };

  const product = productsData.find(
    (product) => product.id === parseInt(id, 10)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="justify-start p-3 max-w-7xl mx-auto overflow-hidden mt-6">
      <div className="flex justify-center">
        <h2
          className={`font-bold md:text-4xl text-2xl text-slate-700 my-5 underline`}
        >
          Related Items
        </h2>
      </div>
      <div>
        {relatedProducts.length > 0 ? (
          <div className="w-full flex p-2 justify-start space-x-5 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="flex flex-col justify-center items-center shadow-md flex-shrink-0 md:h-[350px] md:w-[295px] h-[200px] w-[180px] bg-white border-2 border-gray-200 hover:border-gray-500 duration-200 hover:scale-105 mb-1"
                onClick={() => handleProductClick(relatedProduct)}
              >
                <h3 className="text-center mb-8">{relatedProduct.title}</h3>
                <img
                  className="md:h-[250px] md:w-[220px] h-[130px] w-[120px] object-contain"
                  src={relatedProduct.mainImageUrl}
                  alt={relatedProduct.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-2xl text-gray-500 ">No related items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedItems;
