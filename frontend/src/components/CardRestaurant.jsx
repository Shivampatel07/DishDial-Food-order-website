import React from "react";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import "./../css/ribbon.css";
import { Link } from "react-router-dom";

function CardRestaurant(props) {
  return (
    <div
      style={{ width: "350px" }}
      className="shadow-lg rounded-lg p-4 relative border border-gray-200"
    >
      <Link to={props.url}>
        {props.offers && <div className="ribbon-2">{props.offers}</div>}
        <img src={props.src} alt={props.alt} className="rounded-md h-[200px] w-[320px] cover" />
        <h1 className="text-xl mt-2">{props.title}</h1>
        <div className="flex flex-row items-center space-x-5">
          {" "}
          <Rating
            name="read-only"
            value={props.rating}
            precision={props.value % 1 === 0 ? 0 : 0.5}
            readOnly
          />
          <Chip label={props.rating} color="warning" />
        </div>
        <p className="mt-1 w-2/3 truncate cursor-pointer">
          {" "}
          <abbr className="no-underline text-[#676767]" title={props.famous}>
            {props.famous}
          </abbr>
        </p>
        <p className="mt-1 w-2/3 truncate cursor-pointer">
          {" "}
          <abbr className="no-underline text-[#676767]" title={props.location}>
            {props.location}
          </abbr>
        </p>
      </Link>
    </div>
  );
}

export default CardRestaurant;
