import React from "react";
import TopPlaces from "./TopPlaces";
import TrendingRestaurant from "./TrendingRestaurant";

function Home() {
  return (
    <div>
      <TopPlaces
        items={[
          {
            src: "/assets/restaurant_640623_restaurant020170327115842.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/restaurant_640623_restaurant020170327115842.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/restaurant_640623_restaurant020170327115842.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/restaurant_640623_restaurant020170327115842.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/restaurant_640623_restaurant020170327115842.jpg",
            alt: "company1",
            link: "#",
          },
        ]}
      />
      <TrendingRestaurant />
    </div>
  );
}

export default Home;
