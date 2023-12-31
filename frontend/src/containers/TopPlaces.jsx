import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function TopPlaces(props) {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const jsxElements = props.items.map((src, index) => (
    <div key={index} className="item p-5" data-value={index + 1}>
      <a href={src.link}>
        
        <img
          src={src.src}
          draggable="false"
          className="rounded-xl"
          alt={src.alt}
        />
      </a>
    </div>
  ));
  return (
    <div className="mt-10 bg-[#FCFCFC] shadow-md p-2">
      <h1 className="text-3xl mx-5 font-bold">Top places for you</h1>
      <p className="mx-5 text-[#676767]">Get a best restaurant in your city</p>
      <AliceCarousel
        mouseTracking
        items={jsxElements}
        responsive={responsive}
        disableButtonsControls
      />
    </div>
  );
}

export default TopPlaces;
