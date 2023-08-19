import React from "react";

type Props = {};

function ProductCarousel({}: Props) {
  return (
    <div className="justify-start p-3 max-w-7xl mx-auto overflow-hidden mt-6">
      <h1
        className={`font-bold md:text-4xl text-2xl justify-start text-slate-700 my-5 underline`}
      >
        Treading Now
      </h1>
      <div className="w-full flex overflow-hidden overflow-x-scroll p-2 justify-start space-x-5 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl ">
        {ProductCarouselData.map((product, index) => (
          <div
            key={index}
            className=" shadow-md flex-shrink-0 md:h-[300px] md:w-[250px] h-[200px] w-[180px] bg-white border-2 border-gray-200 hover:border-gray-500 duration-200 hover:scale-105 mb-1"
          >
            <div className="flex justify-center items-center md:mt-5 mt-2 w-full">
              <img
                className="md:h-[200px] md:w-[220px] h-[130px] w-[120px] object-contain"
                src={product.imgSrc}
                alt={`Product-${index}`}
              />
            </div>
            <div className="flex flex-col justify-start mt-2 ml-2">
              <p className="md:text-lg text-sm font-normal ">{product.title}</p>
              <p className="md:text-xl text-sm font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;

const ProductCarouselData = [
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
  {
    imgSrc:
      "https://www.freepnglogos.com/uploads/perfume-png/perfume-mon-guerlain-guerlain-7.png",
    title: "Perfume",
    price: "£80",
  },
];
