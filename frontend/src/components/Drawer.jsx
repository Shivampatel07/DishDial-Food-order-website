import React, { useEffect, useState } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { useAuth } from "../authentication/Authcontext";
import axios from "axios";
import configureData from "../environments/environments";
import toast from "react-hot-toast";

export default function Drawer({ children, isOpen, setIsOpen }) {
  const { cart, setCart } = useAuth();
  const [userData, setUserData] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let tempPrice = 0;
    cart.map((item) => (tempPrice += item.price * item.quantity));
    setTotalPrice(tempPrice);
  }, [cart]);

  const IncreaseItem = (id) => {
    const tempCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(tempCart);
  };

  const DecreaseItem = (id) => {
    const tempCart = cart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
        // If the quantity is  1, don't add the item to the new cart array
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setCart(tempCart);
  };

  const OrderSubmit = async () => {
    await axios
      .get(configureData.baseUrl + "/api/auth/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (
          res.data.address === "" ||
          res.data.address === undefined ||
          res.data.address === null
        ) {
          toast.error("Please add address in profile");
        } else {
          setUserData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const orderData = cart.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        productId: item.id,
      };
    });

    if (userData.address !== "" && userData.address !== undefined) {
      await axios
        .post(
          configureData.baseUrl + "/api/restaurent/add-order",
          {
            orderItems: orderData,
            shippingAddress: userData.address,
            price: totalPrice,
            shippingPrice: 0,
            totalPrice: totalPrice + 0,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Order Placed Successfully");
            setCart([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { isLoggedIn } = useAuth();
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
          {isLoggedIn ? (
            <div>
              <div className="flex justify-end mb-10">
                <button
                  className="bg-orange-500 shadow-md shadow-gray-300 hover:shadow-sm hover:bg-orange-400 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    localStorage.removeItem("cart");
                    setCart([]);
                  }}
                >
                  Clear Cart
                </button>
              </div>
              <div className="flex justify-center">
                {cart.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 w-[80%]">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="bg-orange-400 w-full px-5 py-2 rounded-lg text-white "
                      >
                        <div>Name: {item.name}</div>
                        <div>
                          Qty:{" "}
                          <span
                            className="px-1 py-[1px] mx-1 bg-white text-black cursor-pointer rounded-sm"
                            onClick={() => DecreaseItem(item.id)} // Corrected
                          >
                            {" "}
                            -{" "}
                          </span>{" "}
                          {item.quantity}{" "}
                          <span
                            className="px-2 py-[1px] mx-1 bg-white text-black cursor-pointer rounded-sm"
                            onClick={() => IncreaseItem(item.id)} // Corrected
                          >
                            {" "}
                            +{" "}
                          </span>{" "}
                        </div>
                        <div>
                          Price: {item.price} ({item.price} Rs. X{" "}
                          {item.quantity} = {item.price * item.quantity} Rs.)
                        </div>
                      </div>
                    ))}
                    <hr />
                    <div className="text-xl font-semibold">
                      Total Price = {totalPrice}
                    </div>
                    <div className="flex justify-center">
                      <div
                        className="text-center bg-green-500 shadow-md hover:shadow-sm shadow-gray-400 hover:cursor-pointer w-[50%] px-5 py-2 rounded-md text-white"
                        onClick={OrderSubmit}
                      >
                        Proceed to order
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1 className="text-3xl">Cart is Empty</h1>
                )}
              </div>
            </div>
          ) : (
            <div>Please first Login/Signup</div>
          )}
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
