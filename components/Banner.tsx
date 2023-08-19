import React from "react";
import Image from "next/image";
type Props = {};

function Banner({}: Props) {
  return (
    <div className="justify-start p-3 mt-12 max-w-7xl mx-auto ">
      <div className="grid grid-cols-2 gap-0 shadow-lg">
        <div className=" md:col-span-1 col-span-2 flex flex-col md:h-[400px] h-[300px] w-[full] bg-slate-300 justify-center items-center ">
          <h1 className=" font-bold text-black text-center text-2xl  ">
            Embrace Your Space
          </h1>
          <p className="text-center md:w-[380px] mt-4 font-semibold text-black w-[350px] ">
            Discover the Art of Harmonious Living
          </p>
          <div className=" flex h-10 w-32 bg-black text-white justify-center items-center md:mt-3 mt-6 border-2 border-black hover:text-black hover:bg-white font-semibold duration-200">
            SHOP NOW
          </div>
        </div>
        <div className="col-span-1 hidden md:flex ">
          <Image
            className=" h-[400px] w-[628px] object-cover"
            src={
              "https://d1hy6t2xeg0mdl.cloudfront.net/image/538225/8b7f2245b4/standard"
            }
            alt="bannerPhoto"
            width={630}
            height={400}
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Banner;
