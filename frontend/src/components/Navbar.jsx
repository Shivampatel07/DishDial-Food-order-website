import React, { useEffect, useState } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import logo from "./../assets/dish-dial-high-resolution-logo-black-transparent.png";
import { Link, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import Search from "./Search";
import RegisterForm from "../authentication/RegisterForm";
import LoginForm from "../authentication/LoginForm";
import { useAuth } from "../authentication/Authcontext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  let { isLoggedIn, user } = useAuth();
  let [open, setOpen] = useState(false);
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const [modalSignInOpen, setModalSignInOpen] = useState(false);
  const handleSigninOpen = () => {
    setModalSignInOpen(true);
    setModalSignUpOpen(false);
  };
  const handleSigninClose = () => setModalSignInOpen(false);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const handleSignupOpen = () => {
    setModalSignUpOpen(true);
    setModalSignInOpen(false);
  };
  const handleSignupClose = () => setModalSignUpOpen(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div className={"shadow-lg  w-full fixed top-0 left-0 z-20"}>
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          >
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              <img src={logo} alt="DishDial" width="120px" />
            </Link>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 font-[Raleway] absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {/* <li className="md:ml-8 text-xl md:my-0 my-7 hover:cursor-pointer hover:underline underline-offset-4 inline">
              <Search />
            </li> */}
            <li className="md:ml-8 text-xl md:my-0 my-7 hover:underline underline-offset-4">
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                to="/"
                className={url === "/" ? " underline underline-offset-4" : ""}
              >
                Home <LocalOfferTwoToneIcon />
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7 hover:underline underline-offset-4">
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                to="/help"
                className={
                  url === "/help" ? " underline underline-offset-4" : ""
                }
              >
                Help <HelpTwoToneIcon />
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="md:ml-8 text-xl md:my-0 my-5 ">
                <Link to="/profile">
                  <button className=" md:ms-5 px-5 py-3 bg-white  rounded-3xl hover:bg-orange-400">
                    Profile <AccountCircleIcon />
                  </button>
                </Link>
              </li>
            ) : (
              <li className="md:ml-8 text-xl md:my-0 my-5 ">
                <button
                  className=" md:ms-5 px-5 py-3 bg-orange-400 rounded-3xl hover:bg-orange-600"
                  onClick={() => {
                    setOpen(false);
                    handleSigninOpen();
                  }}
                >
                  Sign-in
                </button>
                <Modal
                  open={modalSignInOpen}
                  onClose={handleSigninClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <h1 className="text-3xl font-bold font-[Raleway] text-center mb-10 ">
                      Sign-in Form
                    </h1>
                    <LoginForm handleSignupOpen={handleSignupOpen} />
                  </Box>
                </Modal>
                <Modal
                  open={modalSignUpOpen}
                  onClose={handleSignupClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <h1 className="text-3xl font-bold font-[Raleway] text-center mb-10 ">
                      Sign-Up Form
                    </h1>

                    <RegisterForm handleSigninOpen={handleSigninOpen} />
                  </Box>
                </Modal>
              </li>
            )}

            <li
              className="md:ml-8 text-xl w-contain border border-white px-2 rounded-md py-2 hover:bg-[#f5f5f5] hover:border-black hover:cursor-pointer"
              onClick={() => {
                setOpen(false);
                setDrawerOpen(true);
              }}
            >
              <ShoppingCartTwoToneIcon />{" "}
              <span className="inline md:hidden">Cart</span>
            </li>
            <Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen}></Drawer>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Navbar;
