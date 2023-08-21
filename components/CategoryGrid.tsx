import React from "react";
import productsData from "./../data/ProductData.json";

type Props = { category: string };

function CategoryGrid({ category }: Props) {
  // Receive 'category' prop
  // Find other products with the same category as the current product
  const relatedProducts = productsData.filter((p) => p.category === category);
  return (
    <div className="justify-start p-3 max-w-7xl mx-auto overflow-hidden mt-6">
      <div className="flex justify-center">
        <h2
          className={`font-bold md:text-4xl text-2xl text-slate-700 my-5 underline`}
        >
          All {category} Products
        </h2>
      </div>
      <div>
        <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 justify-start scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl gap-5">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
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
