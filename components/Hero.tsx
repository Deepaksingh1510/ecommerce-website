import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Props = {};

function Hero({}: Props) {
  const router = useRouter(); // Use the useNavigation hook
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
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-3 max-w-7xl mx-auto mt-5 ">
      <div
        onClick={navigateToCategoryHome}
        className="col-span-1 md:col-span-2 hover:scale-[1.03] duration-300 md:max-h-[600px] max-h-[300px] shadow-lg relative cursor-pointer "
      >
        <Image
          className=" h-full w-full "
          src={
            "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
          }
          alt={"comfy"}
          width={600}
          height={600}
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
        <p className="absolute bottom-0 left-0  text-gray-100 p-2 text-2xl font-semibold">
          Home
        </p>
      </div>
      <div
        onClick={navigateToCategorySports}
        className="col-span-1 hover:scale-105 duration-300 md:max-h-[600px] max-h-[300px] shadow-lg relative cursor-pointer"
      >
        <Image
          className="object-cover h-full "
          src={
            "https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          }
          alt={"comfy"}
          width={600}
          height={600}
        />
        <p className="absolute bottom-0 left-0  text-gray-100 p-2 text-2xl font-semibold">
          Sports
        </p>
      </div>
      <div className="md:col-span-1 col-span-2 ">
        <div className="md:grid md:grid-rows-2 flex gap-3  md:max-h-[600px] max-h-[300px]">
          <div
            onClick={navigateToCategoryTech}
            className="row-span-1 hover:scale-105 duration-300 shadow-lg relative cursor-pointer"
          >
            <Image
              className="object-cover h-full"
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              alt="comfy"
              width={630}
              height={600}
            />
            <p className="absolute bottom-0 left-0 text-gray-100 p-2 text-2xl font-semibold">
              Electronics
            </p>
          </div>
          <div
            onClick={navigateToCategoryKitchen}
            className="row-span-1  hover:scale-105 duration-300 shadow-lg relative cursor-pointer"
          >
            <Image
              className="object-cover h-full"
              src="https://mimoucadesign.com/wp-content/uploads/2020/10/kitchen-design-4.jpg"
              alt="comfy"
              width={630}
              height={600}
            />

            <p className="absolute bottom-0 left-0 text-gray-100 p-2 text-2xl font-semibold ">
              Kitchen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
