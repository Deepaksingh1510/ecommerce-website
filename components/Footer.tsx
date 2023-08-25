import React from "react";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
type Props = {};

function Footer({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-[180px] bg-black text-white shadow-lg mt-[50px] ">
      <div className="flex flex-row space-x-10 ">
        <p className="md:text-xl text-md hover:underline duration-300 cursor-pointer">
          About
        </p>
        <p className="md:text-xl text-md hover:underline duration-300 cursor-pointer">
          Products
        </p>
        <p className="md:text-xl text-md hover:underline duration-300 cursor-pointer">
          FAQs
        </p>
        <p className="md:text-xl text-md hover:underline duration-300 cursor-pointer">
          Contact us
        </p>
      </div>
      <div className="flex flex-row space-x-6 mt-6 ">
        <AiFillInstagram className="cursor-pointer" size={30} />
        <AiFillTwitterCircle className="cursor-pointer" size={30} />
        <BsFacebook className="cursor-pointer" size={28} />
      </div>
    </div>
  );
}

export default Footer;
