import React from "react";
import TopOffers from "./TopOffers";
import TrendingRestaurantOffers from "./TrendingRestaurantOffers";

function Offers() {
  return (
    <div>
      <TopOffers
        items={[
          {
            src: "/assets/gift-voucher-template-with-chicken-photo/4770896-1.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/gift-voucher-template-with-chicken-photo/4770896-1.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/gift-voucher-template-with-chicken-photo/4770896-1.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/gift-voucher-template-with-chicken-photo/4770896-1.jpg",
            alt: "company1",
            link: "#",
          },
          {
            src: "/assets/gift-voucher-template-with-chicken-photo/4770896-1.jpg",
            alt: "company1",
            link: "#",
          },
        ]}
      />
      <TrendingRestaurantOffers />
    </div>
  );
}

export default Offers;
