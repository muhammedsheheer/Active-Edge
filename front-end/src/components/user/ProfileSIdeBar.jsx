// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../../redux/slices/authSlice";
// import api from "../../config/axiosConfig";
// import {
// 	FaHeart,
// 	FaShoppingCart,
// 	FaUser,
// 	FaShoppingBag,
// 	FaAddressCard,
// 	FaWallet,
// } from "react-icons/fa";

// const ProfileSideBar = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const [userDetails, setUserDetails] = useState({
// 		name: "",
// 		phone: "",
// 		email: "",
// 	});
// 	const [imageData, setImageData] = useState({ dpImage: null });

// 	const fetchUserDetails = async () => {
// 		try {
// 			const response = await api.get("/users/getUserDetails");
// 			const userData = response?.data?.user;
// 			setUserDetails({
// 				name: userData.name,
// 				email: userData.email,
// 				phone: userData.phone,
// 			});
// 			setImageData({ dpImage: userData.dpImage });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchUserDetails();
// 	}, []);

// 	const handleLogOut = async () => {
// 		try {
// 			await api.post("/users/logout");
// 			dispatch(logoutUser());
// 			navigate("/");
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<div className="w-full  lg:w-72 bg-white shadow-md rounded-lg overflow-hidden p-4 lg:p-6">
// 			<div className="flex flex-col items-center lg:items-center text-center lg:text-left">
// 				<h2 className="text-xl sm:text-xl font-semibold text-black ">
// 					Account Info
// 				</h2>
// 				<nav className="mt-6 space-y-2 sm:space-y-3 w-full">
// 					<Link
// 						to="editProfile"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaUser />
// 						Profile
// 					</Link>
// 					<Link
// 						to="/wishlist"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaHeart />
// 						Wishlist
// 					</Link>
// 					<Link
// 						to="/cart"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaShoppingCart />
// 						Cart
// 					</Link>
// 					<Link
// 						to="address"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaAddressCard />
// 						Address
// 					</Link>
// 					<Link
// 						to="orderHistory"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaShoppingBag />
// 						Orders
// 					</Link>
// 					<Link
// 						to="wallet"
// 						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
// 					>
// 						<FaWallet />
// 						Wallet
// 					</Link>
// 				</nav>
// 				<button
// 					onClick={handleLogOut}
// 					className="mt-5 block text-white p-2 rounded-sm bg-black hover:text-gray-700 w-full text-center"
// 				>
// 					Logout
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default ProfileSideBar;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";
import api from "../../config/axiosConfig";
import {
	FaHeart,
	FaShoppingCart,
	FaUser,
	FaShoppingBag,
	FaAddressCard,
	FaWallet,
} from "react-icons/fa";

const ProfileSideBar = ({ isSidebarOpen, toggleSidebar }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userDetails, setUserDetails] = useState({
		name: "",
		phone: "",
		email: "",
	});
	const [imageData, setImageData] = useState({ dpImage: null });

	const fetchUserDetails = async () => {
		try {
			const response = await api.get("/users/getUserDetails");
			const userData = response?.data?.user;
			setUserDetails({
				name: userData.name,
				email: userData.email,
				phone: userData.phone,
			});
			setImageData({ dpImage: userData.dpImage });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const handleLogOut = async () => {
		try {
			await api.post("/users/logout");
			dispatch(logoutUser());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleLinkClick = () => {
		if (isSidebarOpen) {
			toggleSidebar();
		}
	};

	return (
		<div className="p-4 lg:p-6 w-full lg:w-64 bg-white shadow-md rounded-lg">
			<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
				<h2 className="text-xl font-semibold text-black">Account Info</h2>
				<nav className="mt-6 space-y-3 w-full">
					<Link
						to="editProfile"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaUser />
						Profile
					</Link>
					<Link
						to="/wishlist"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaHeart />
						Wishlist
					</Link>
					<Link
						to="/cart"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaShoppingCart />
						Cart
					</Link>
					<Link
						to="address"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaAddressCard />
						Address
					</Link>
					<Link
						to="orderHistory"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaShoppingBag />
						Orders
					</Link>
					<Link
						to="wallet"
						onClick={handleLinkClick}
						className="text-black hover:text-gray-700 flex items-center gap-2"
					>
						<FaWallet />
						Wallet
					</Link>
				</nav>
				<button
					onClick={handleLogOut}
					className="mt-5 w-full bg-black text-white p-2 rounded hover:bg-gray-800"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfileSideBar;
