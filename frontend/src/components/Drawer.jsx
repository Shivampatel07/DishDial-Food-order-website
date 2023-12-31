import React from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out h-screen" +
        (isOpen
          ? " transition-opacity opacity-100 duration-300 translate-x-0  "
          : " delay-300 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-[280px] md:max-w-md  right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-[280px] md:max-w-md pb-10 flex flex-col space-y-6 overflow-y-scroll h-full font-[Raleway] mt-20 md:mt-0">
          <header className="p-4 font-bold text-3xl text-center ">
            Cart <ShoppingCartTwoToneIcon fontSize="large" />
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
