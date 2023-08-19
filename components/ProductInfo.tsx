"use client";
import React, { useEffect, useState } from "react";
import productsData from "./../data/ProductData.json";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addtoCart } from "@/slices/cartSlice";
type Props = { id: string };

function ProductInfo({ id }: Props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0); // Initialize with 0
  const [hoveredImage, setHoveredImage] = useState("");

  // Find the product with the matching id
  const product = productsData.find(
    (product) => product.id === parseInt(id, 10)
  );

  // Check if product exists
  if (!product) {
    return <div>Product not found</div>;
  }

  // Update the price whenever quantity changes
  const updatedPrice = (newQuantity: number) => {
    const newPrice = product.price * newQuantity;
    setPrice(newPrice);
  };

  const handleImageHover = (imageUrl: string) => {
    setHoveredImage(imageUrl);
  };

  const addQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updatedPrice(newQuantity);
  };

  const subtractQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updatedPrice(newQuantity);
    }
  };
  const addItemtoCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      mainImageUrl: product.mainImageUrl,
      quantity: quantity,
      totalPrice: price,
    };
    dispatch(addtoCart(item));
  };
  return (
    <div className="justify-start p-3 mt-12 max-w-7xl mx-auto ">
      <h1 className=" flex font-bold text-4xl justify-center items-center mb-10">
        {product.title}
      </h1>
      <div className=" grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 md:gap-0 gap-10 md:h-[500px] shadow-lg">
        <div className=" flex flex-col md:col-span-1 row-span-1 justify-center items-center borderborder-gray-200 bg-gray-100">
          <img
            className="md:h-[380px] h-[350px] "
            src={hoveredImage || product.mainImageUrl}
            alt={"main"}
          />
          <div className="grid grid-cols-3 h-[100px] w-[300px]">
            <div
              className="flex col-span-1 border hover:border-gray-400 justify-center items-center hover:scale-105"
              onMouseEnter={() => handleImageHover(product.mainImageUrl)}
            >
              <img
                className="h-[85px]"
                src={product.mainImageUrl}
                alt={product.title}
              />
            </div>
            <div
              className="flex col-span-1 border hover:border-gray-400 justify-center items-center hover:scale-105"
              onMouseEnter={() => handleImageHover(product.secondImageUrl)}
            >
              <img
                className="h-[85px]"
                src={product.secondImageUrl}
                alt={product.title}
              />
            </div>
            <div
              className="flex col-span-1 border hover:border-gray-400 justify-center items-center hover:scale-105"
              onMouseEnter={() => handleImageHover(product.thirdImageUrl)}
            >
              <img
                className="h-[85px]"
                src={product.thirdImageUrl}
                alt={product.title}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:col-span-1 row-span-1 bg-[#e5e5e5] justify-center items-center  ">
          <p className="flex text-center font-medium w-[85%] md:pb-8 pb-6 sm:text-base text-[14px] ">
            {product.details}
          </p>
          <div className="flex flex-row justify-center items-center space-x-3">
            <h1 className=" sm:text-xl text-lg font-semibold ">Quantity</h1>
            <div className="grid grid-cols-3 h-16 sm:w-[190px] w-[180px]">
              <div
                className="flex justify-center items-center col-span-1 bg-white border border-black cursor-pointer"
                onClick={subtractQuantity}
              >
                <AiOutlineMinus size={28} />
              </div>
              <div className=" flex justify-center items-center col-span-1 bg-gray-200 border border-black border-l-0 border-r-0">
                <p className="text-2xl font-normal">{quantity}</p>
              </div>
              <div
                className="flex justify-center items-center col-span-1 bg-white border border-black cursor-pointer"
                onClick={addQuantity}
              >
                <BsPlus size={28} />
              </div>
            </div>
            <div>
              <h1 className="sm:text-xl text-lg font-semibold">
                £{price !== 0 ? price : product.price}
              </h1>
            </div>
          </div>
          <div className="flex flex-row space-x-20 mt-6">
            <div
              className="flex justify-center items-center h-12 w-[120px] bg-black hover:bg-white hover:text-black text-white hover:border-2 hover:border-black"
              onClick={addItemtoCart}
            >
              <p className=" text-lg font-medium">Add to cart</p>
            </div>
            <div className="flex justify-center items-center h-12 w-[120px] bg-black hover:bg-white hover:text-black text-white hover:border-2 hover:border-black">
              <p className=" text-lg font-medium">Buy Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
