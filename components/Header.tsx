"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/cartSlice";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
type Props = {};

function Header({}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const items = useSelector(selectItems);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`w-full bg-white text-black sticky shadow-lg ${
        isSidebarOpen ? "sidebar-open z-[400]" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row h-auto md:h-20 justify-between items-center p-3 md:p-6 max-w-7xl mx-auto">
        <div className="mb-2 md:mb-0">
          <Image
            className=""
            src={
              "https://seeklogo.com/images/T/Toyota-logo-39FDE466C4-seeklogo.com.png"
            }
            alt={"logo"}
            width={50}
            height={50}
          />
        </div>
        <div className="flex">
          <Link href={"/"}>
            <div className="headerbtn mt-1">Home</div>
          </Link>
          <Link href={"/sale"}>
            <div className="headerbtn mt-1">Sale</div>
          </Link>
          <Link href={"/all-products"}>
            <div className="headerbtn mt-1">Products</div>
          </Link>
          <div className="px-4 flex relative">
            <IoCartSharp
              size={28}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
            <div className="absolute -top-[10px] right-[10px] h-5 w-5 rounded-full bg-red-500">
              <p className=" text-center text-sm text-white">{items.length}</p>
            </div>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

export default Header;
