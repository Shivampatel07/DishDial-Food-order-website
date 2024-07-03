import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import configureData from "../environments/environments";
import CardProduct from "../components/CardProduct";
import { useAuth } from "../authentication/Authcontext";

function RestaurantPage() {
  const copyNumberToClipboard = () => {
    navigator.clipboard.writeText(restaurantData.phone_number);
    toast.success("Phone number copied to clipboard");
  };
  const { setIsLoading } = useAuth()
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = React.useState({
    name: '',
    image: '',
    address: '',
    phone_number: ''
  });
  const [menuData, setMenuData] = React.useState([]);

  useEffect(() => {
    setIsLoading(true)
    axios.get(configureData.baseUrl + "/api/restaurent/" + id)
      .then((response) => {
        const restaurantData = response.data
        if (restaurantData.success === 1) {
          setRestaurantData(restaurantData.data.restaurant);
          setMenuData(restaurantData.data.products);
        }
        else {
          toast.error(restaurantData.message)
        }
      }).catch((error) => {
        toast.error(error)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [id]);
  return (
    <div className="m-5 flex flex-col justify-center">
      <h1 className="text-4xl ms-5 font-bold mt-5">
        {restaurantData.name}
      </h1>
      <div className="p-5">
      <img
        src={configureData.restaurantImage + "/" + restaurantData.image}
        alt={restaurantData.name}
        className="w-full h-[300px] object-cover rounded-md"
      />
      </div>
      <div className="mx-5 mt-5 text-xl font-semibold">
        Address : {restaurantData.address}
      </div>
      <div className="mx-5 mt-3 text-xl font-semibold">
        Phone no. :{" "}
        <button
          className="px-3 py-1 rounded-md bg-orange-500 hover:cursor-cell shadow-sm shadow-gray-700 hover:shadow-lg"
          title="Click to copy"
          onClick={copyNumberToClipboard}
        >
          {restaurantData.phone_number}
        </button>
      </div>
      <div className="sm:p-5 sm:m-5 border-2 border-gray-100 rounded-xl bg-gray-200 ">
        {menuData.length > 0 ? (
          <div>
            <h2 className="text-3xl text-center m-3 font-bold mb-10">
              Menu Information
            </h2>
            <div className="flex justify-center">
              <div className="w-[100%] sm:w-[90%]">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                  {menuData.map((product, index) => {
                    return (
                      <div key={index}>
                        <CardProduct
                          id={product._id}
                          src={product.image}
                          name={product.name}
                          description={product.description}
                          price={product.price}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-2xl text-center font-semibold">
            Currently no menu available
          </h3>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;
