import React, { useEffect, useState } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import logo from "./../assets/dish-dial-high-resolution-logo-black-transparent.png";
import { Link, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import RegisterForm from "../authentication/RegisterForm";
import LoginForm from "../authentication/LoginForm";
import { useAuth } from "../authentication/Authcontext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const Navbar = () => {

	let { isLoggedIn } = useAuth();
	let [open, setOpen] = useState(false);
	const location = useLocation();
	const [url, setUrl] = useState(null);

	useEffect(() => {
		setUrl(location.pathname);
	}, [location]);

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: '90%',
		bgcolor: "white",
		boxShadow: 24,
		p: 4,
		borderRadius: "10px",
		maxWidth: 400
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
			<div className="shadow-lg  w-full fixed top-0 left-0 z-20 font-[Raleway]">
				<div className="flex items-center justify-between bg-white py-2 md:px-8 px-5">
					<div className="text-2xl absolute right-8 cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
						{open ? <CloseTwoToneIcon fontSize="xl" /> : <MenuTwoToneIcon fontSize="xl" />}
					</div>
					<div className="cursor-pointer flex items-center">
						<Link to="/" onClick={() => setOpen(false)}>
							<img src={logo} alt="DishDial" width="90px" />
						</Link>
					</div>
					<ul className={`md:flex md:items-center md:py-0 py-5 absolute md:static bg-white md:z-auto z-[-1] top-14 md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in-out ${open ? "w-[50%] px-5 right-0" : "px-5 right-[-200px]"}`}>
						<li className="md:ml-8 text-md md:text-lg md:my-0 my-3 hover:underline underline-offset-4">
							<Link to="/" className={url === "/" ? " underline underline-offset-4" : ""} onClick={() => setOpen(false)}>
								Home <LocalOfferTwoToneIcon />
							</Link>
						</li>
						<li className="md:ml-8 text-md md:text-lg md:my-0 my-7 hover:underline underline-offset-4">
							<Link to="/help" className={url === "/help" ? " underline underline-offset-4" : ""} onClick={() => setOpen(false)}>
								Help <HelpTwoToneIcon />
							</Link>
						</li>
						{isLoggedIn ? (
							<li className="md:ml-8 text-md md:text-lg md:my-0 my-5 ">
								<Link to="/profile">
									<button className="md:px-5 mb-3 md:mb-0 md:py-3 bg-white hover:underline hover:md:no-underline underline-offset-4  rounded-3xl hover:md:bg-orange-400">
										Profile <AccountCircleIcon />
									</button>
								</Link>
							</li>
						) : (
							<li className="md:ml-8 text-md md:text-lg md:my-0 my-5 ">
								<button className="md:ms-5 px-5 py-2 bg-orange-400 rounded-3xl hover:bg-orange-600"
									onClick={() => {
										setOpen(false);
										handleSigninOpen();
									}}>
									Sign-in
								</button>
								<Modal
									open={modalSignInOpen}
									onClose={handleSigninClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description">
									<Box sx={modalStyle}>
										<h1 className="text-2xl uppercase md:text-3xl font-bold text-center mb-5 md:mb-10">
											Sign-in Form
										</h1>
										<LoginForm handleSignupOpen={handleSignupOpen} />
									</Box>
								</Modal>
								<Modal
									open={modalSignUpOpen}
									onClose={handleSignupClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description">
									<Box sx={modalStyle}>
										<h1 className="text-2xl uppercase md:text-3xl font-bold text-center mb-5 md:mb-10">
											Sign-Up Form
										</h1>
										<RegisterForm handleSigninOpen={handleSigninOpen} />
									</Box>
								</Modal>
							</li>
						)}

						<li className="md:ml-8 text-md md:text-lg w-contain md:border md:px-2 rounded-md md:py-2 hover:underline hover:md:no-underline underline-offset-4 hover:md:bg-[#f5f5f5] hover:border-black hover:cursor-pointer"
							onClick={() => {
								setOpen(false);
								setDrawerOpen(true);
							}}>
							<span className="inline md:hidden">Cart</span>
							<ShoppingCartTwoToneIcon />
						</li>
						<Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen}></Drawer>
					</ul>
				</div>
			</div>
			<br />
			<br />
			<br />
		</>
	);
};

export default Navbar;
