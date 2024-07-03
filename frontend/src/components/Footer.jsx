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
    <div className="w-full bg-[#FFB629] p-3 grid grid-cols-1 lg:grid-cols-3 mt-10">
      <div className="flex items-center justify-center">
        <div>
          <div className="flex justify-center">
            {" "}
            <img src={logo} alt="DishDial" width="120px" />
          </div>
          <div className="grid grid-cols-5 mt-3 gap-3">
            <a href="#" target="_blank"><FacebookTwoToneIcon /></a>
            <a href="https://www.instagram.com/shivam_patel2004/" target="_blank"><InstagramIcon /></a>
            <a href="https://x.com/ShivamP83481137" target="_blank"><TwitterIcon /></a>
            <a href="https://www.linkedin.com/in/shivam-patel-18436822a/" target="_blank"><LinkedInIcon /></a>
            <a href="https://www.youtube.com/channel/UC2gg202kAB7KDMPHI3XXwjQ" target="_blank"><YouTubeIcon /></a>
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-center p-3 md:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 font-[Raleway]">
          <div>
            <h2 className="text-lg font-semibold">ABOUT DISHDIAL</h2>
            <ul className="mt-3">
              <li>BLOG</li>
              {/* <li>WORK WITH US</li> */}
              {/* <li>REPORT</li> */}
              <li>CONTACT US</li>
              <li>ABOUT</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Developed by</h2>
            <ul className="mt-3">
              <li>Patel Shivam Hareshkumar</li>
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
