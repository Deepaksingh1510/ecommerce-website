import React, { useState } from "react";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { AiOutlineMinus } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removefromCart,
  incrementQuantity,
  decrementQuantity,
  selectItems,
} from "@/slices/cartSlice";
import { toast } from "react-toastify";

type Props = { onClose: () => void; isOpen: boolean };

function Sidebar({ onClose, isOpen }: Props) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);
  return (
    <>
      {/* Dark overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black opacity-50 z-[200]"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full md:w-[550px] w-full shadow-lg bg-white transition-transform z-[400] ${
          isOpen ? "translate-x-0" : "translate-x-full z-[400]"
        }`}
      >
        <div className="bg-white z-20">
          <div className="flex justify-between items-center p-3">
            <div className="flex flex-row items-center space-x-2">
              <FaShoppingBasket className="ml-2" size={26} />
              <h2 className="text-2xl font-semibold mt-1">
                Shopping Cart ({items.length})
              </h2>
            </div>
            <IoCloseSharp onClick={onClose} size={30} color="#6b7280" />
          </div>
          <div className="px-4 overflow-y-scroll h-[75vh] scrollbar-thin scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl scrollbar-thumb-red-500 scrollbar-track-gray-300">
            {/* Render your cart items here */}
            {items.map((item) => (
              <div key={item.id} className="flex flex-col py-2  ">
                <div className=" flex flex-row h-[150px] w-full border border-black hover:border-2 justify-start items-center">
                  <div className="flex h-full w-[45%] justify-center items-center">
                    <img
                      className="ml-6 mr-6 h-[90%]"
                      src={item.mainImageUrl}
                      alt="products"
                    />
                  </div>
                  <div className="flex flex-col h-full w-full space-y-4 bg-slate-200 ">
                    <div className="flex w-full h-[90%] justify-between mt-5  ">
                      <p className=" ml-5 text-2xl  ">{item?.title}</p>
                      <p className=" mr-5 text-2xl font-bold">
                        £{item?.totalPrice}
                      </p>
                    </div>
                    <div className="flex w-full justify-between pb-5  ">
                      <div className="grid grid-cols-3 gap-[2px] h-8 w-[105px] ml-5">
                        <div
                          onClick={() =>
                            dispatch(decrementQuantity({ itemId: item.id }))
                          }
                          className="flex justify-center items-center col-span-1 bg-black border border-black cursor-pointer"
                        >
                          <AiOutlineMinus size={20} color="white" />
                        </div>
                        <div className=" flex justify-center items-center col-span-1 bg-white border border-black ">
                          <p className="text-2xl font-normal">
                            {item?.quantity}
                          </p>
                        </div>
                        <div
                          onClick={() =>
                            dispatch(incrementQuantity({ itemId: item.id }))
                          }
                          className="flex justify-center items-center col-span-1 bg-black border border-black cursor-pointer"
                        >
                          <BsPlus size={24} color="white" />
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          dispatch(removefromCart(item.id));
                          toast.success("Item removed from Cart", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }}
                      >
                        <RiDeleteBin6Line
                          className="mr-10 cursor-pointer"
                          size={28}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex justify-center items-center ">
            <span className="border-b-[3px] border-gray-500 px-2 w-[60%] mb-5"></span>
          </div>
          <div className="flex flex-row md:px-10 px-8 items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className=" font-bold text-2xl">Subtotal</h1>
              <div className="flex flex-row justify-start items-center space-x-2 text-gray-800">
                <ImPriceTags size={24} />
                <p className="text-2xl font-semibold">£{subtotal}</p>
              </div>
            </div>
            <div className="flex justify-center items-center h-12 w-[120px] border-2 hover:bg-white bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-white ">
              <p className="text-lg font-medium">Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
