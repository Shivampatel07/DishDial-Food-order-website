import React from "react";
import logo from "./../assets/dish-dial-high-resolution-logo-black-transparent.png";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GooglePlayIcon from "./../assets/google-play-png-logo-3799.png";
import AppleStoreIcon from "./../assets/app-store-png-logo-33116.png";

function Footer() {
  return (
    <div className="w-full bg-[#FFB629] p-3 grid grid-cols-1 md:grid-cols-2 mt-10">
      <div className="flex items-center justify-center p-3">
        <div>
          <div className="logo">
            {" "}
            <img src={logo} alt="DishDial" width="120px" />
          </div>
          <div className="grid grid-cols-5 mt-3 gap-3">
            <FacebookTwoToneIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedInIcon />
            <YouTubeIcon />
          </div>
          <div>
            <img
              src={GooglePlayIcon}
              alt=""
              width={100}
              className="mt-3 inline"
            />
            <img
              src={AppleStoreIcon}
              alt=""
              width={100}
              className="mt-3 inline ms-3"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-3">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 font-[Raleway]">
          <div>
            <h2 className="text-lg font-semibold">ABOUT DISHDIAL</h2>
            <ul className="mt-3">
              <li>BLOG</li>
              <li>WORK WITH US</li>
              <li>REPORT</li>
              <li>CONTACT US</li>
              <li>ABOUT</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Developed by</h2>
            <ul className="mt-3">
              <li>Patel Shivam Hareshkumar</li>
              <li>Gurjar Divyesh Vimalkumar</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">ABOUT DISHDIAL</h2>
            <ul className="mt-3">
              <li>TERMS & CONDITIONS</li>
              <li>SECURITY</li>
              <li>PRIVACY</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
