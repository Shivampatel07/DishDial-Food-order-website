import React, { useEffect } from "react";
import CardRestaurant from "../components/CardRestaurant";
import axios from "axios";
import configureData from "../environments/environments";

function TrendingRestaurant() {
  const [restaurantData, setRestaurantData] = React.useState([]);
  useEffect(() => {
    axios
      .get(configureData.baseUrl + "/api/restaurent/all")
      .then((res) => {
        console.log(res.data);
        setRestaurantData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        Trending restaurant at Ahmedabad
      </h1>
      <div className="flex justify-center items-center mt-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14  ">
          {restaurantData.map((restaurant) => {
            return (
              <CardRestaurant
                src={configureData.restaurantImage + "/" + restaurant.image}
                alt="ahmedabad"
                title={restaurant.name}
                rating={restaurant.rating}
                famous={restaurant.famous ? restaurant.famous : "Not Available"}
                location={restaurant.address}
                url={"/restaurant/" + restaurant._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrendingRestaurant;
