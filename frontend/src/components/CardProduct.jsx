import React from "react";
import "./../css/ribbon.css";
import configureData from "../environments/environments";
import { useAuth } from "../authentication/Authcontext";
import toast from "react-hot-toast";

function CardProduct(props) {
  const { setCart } = useAuth();
  const AddToCart = () => {
    let cart = localStorage.getItem("cart");
    if (cart === null) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    if (cart.find((item) => item.id === props.id)) {
      cart = cart.map((item) => {
        if (item.id === props.id) {
          item.quantity += 1;
        }
        return item;
      });
    } else {
      let product = {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 1,
      };
      cart.push(product);
    }
    toast.success("Product added to cart");
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="shadow-lg  rounded-lg p-3 relative  w-[100%] ">
      <img
        src={`${configureData.productImage}/${props.src}`}
        alt={props.name}
        className="rounded-xl object-cover h-[200px] w-full"
      />
      <h1 className="text-xl mt-3">{props.name}</h1>
      <p className="mt-1 cursor-pointer truncate" title={props.description}>
        Description : {props.description}
      </p>
      <h3 className="text-lg font-semibold">Price : {props.price} Rs.</h3>
      <div className="flex justify-center">
        <div
          className="px-3 py-2 bg-orange-500 m-3 rounded-lg shadow-md hover:shadow-sm hover:bg-orange-400 hover:cursor-pointer shadow-gray-500"
          onClick={AddToCart}
        >
          Add to cart
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
