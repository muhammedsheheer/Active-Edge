// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
// FaShoppingBag,
// FaHeart,
// FaShoppingCart,
// FaWallet,
// FaUserFriends,
// FaUser,
// FaMapMarkerAlt,
// } from "react-icons/fa";
// import { RiLogoutBoxRLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../config/axiosConfig";
// import { logoutUser } from "../../../redux/slices/authSlice";

// const ProfileSideBar = () => {
// 	const location = useLocation();
// 	const dispatch = useDispatch();
// 	const { user } = useSelector((state) => state.auth);
// 	const menuItems = [
// 		{ name: "Orders", icon: FaShoppingBag, path: "/orders" },
// 		{ name: "Wishlist", icon: FaHeart, path: "/wishlist" },
// 		{ name: "Cart", icon: FaShoppingCart, path: "/cart" },
// 		{ name: "FOOTFLEX Wallet", icon: FaWallet, path: "/wallet" },
// 		{
// 			name: "Invite Friends",
// 			icon: FaUserFriends,
// 			path: "/userProfile/invite",
// 		},
// 		{ name: "Edit Profile", icon: FaUser, path: "/editprofile" },
// 		{ name: "Address", icon: FaMapMarkerAlt, path: "/address" },
// 	];

// 	const handleLogout = async () => {
// 		await api.post("/users/logout");
// 		dispatch(logoutUser());
// 	};

// 	return (
// 		<div className="w-72 bg-white shadow-md rounded-lg overflow-hidden ml-10">
// 			<div className="px-6 py-5">
// 				<h2 className="text-xl font-semibold text-gray-800">My Account</h2>

// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium text-gray-700">
// 						Orders & Credits
// 					</h3>
// 					<ul className="mt-3 space-y-3">
// 						{menuItems.slice(0, 5).map((item, index) => (
// 							<li key={index}>
// 								<Link
// 									to={item.path}
// 									className={`text-base flex items-center cursor-pointer hover:text-gray-800 ${
// 										location.pathname === item.path
// 											? "text-blue-600 font-semibold"
// 											: "text-gray-600"
// 									}`}
// 								>
// 									<item.icon className="mr-3 text-lg" />
// 									{item.name}
// 								</Link>
// 							</li>
// 						))}
// 					</ul>
// 				</div>

// 				<div className="mt-8">
// 					<h3 className="text-lg font-medium text-gray-700">Profile</h3>
// 					<ul className="mt-3 space-y-3">
// 						{menuItems.slice(5).map((item, index) => (
// 							<li key={index}>
// 								<Link
// 									to={item.path}
// 									className={`text-base flex items-center cursor-pointer hover:text-gray-800 ${
// 										location.pathname === item.path
// 											? "text-blue-600 font-semibold"
// 											: "text-gray-600"
// 									}`}
// 								>
// 									<item.icon className="mr-3 text-lg" />
// 									{item.name}
// 								</Link>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			</div>

// 			<div className="mt-8 px-6 py-4 flex items-center gap-6">
// 				<div className="flex items-center">
// 					{user?.dpImage ? (
// 						<img
// 							src={user?.dpImage}
// 							alt="Avatar"
// 							className="w-12 h-12 rounded-full mr-3"
// 						/>
// 					) : (
// 						<img
// 							src="https://via.placeholder.com/48"
// 							alt="Avatar"
// 							className="w-12 h-12 rounded-full mr-3"
// 						/>
// 					)}

// 					<span className="text-base font-medium text-gray-700">
// 						{user?.firstName}
// 					</span>
// 				</div>
// 				{/* <Link to="/login" > */}
// 				<button
// 					className="flex items-center text-red-500 hover:text-red-600"
// 					onClick={handleLogout}
// 				>
// 					<RiLogoutBoxRLine size={24} className="mr-2" />
// 					<span className="text-sm font-medium">Logout</span>
// 				</button>
// 				{/* </Link> */}
// 			</div>
// 		</div>
// 	);
// };

// export default ProfileSideBar;

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../../redux/slices/authSlice";
// import api from "../../config/axiosConfig";
// import { FaHeart, FaShoppingCart, FaUser, FaShoppingBag } from "react-icons/fa";
// import { FaAddressCard, FaWallet } from "react-icons/fa6";

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
// 		<div className="w-full lg:w-72 bg-white shadow-md rounded-lg overflow-hidden p-6 lg:p-0">
// 			<div className="flex flex-col items-center lg:items-center text-center lg:text-left">
// 				<img
// 					src={imageData.dpImage}
// 					alt={userDetails.name}
// 					className="rounded-full w-32 h-32 mb-4 shadow-lg object-cover"
// 				/>
// 				<h2 className="text-2xl font-bold text-black">{userDetails.name}</h2>
// 				<p className="text-gray-600">{userDetails.phone}</p>
// 				<nav className="mt-6 ml-6 space-y-3 w-full">
// 					<Link
// 						to="editprofile"
// 						className=" text-black hover:text-gray-700 flex flex-row gap-2 items-center "
// 					>
// 						<FaUser />
// 						Edit Profile
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
// 						to="/wallet"
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

const ProfileSideBar = () => {
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

	return (
		<div className="w-full lg:w-72 bg-white shadow-md rounded-lg overflow-hidden p-4 lg:p-6">
			<div className="flex flex-col items-center lg:items-center text-center lg:text-left">
				<h2 className="text-xl sm:text-xl font-semibold text-black ">
					Account Info
				</h2>
				<nav className="mt-6 space-y-2 sm:space-y-3 w-full">
					<Link
						to="editProfile"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaUser />
						Profile
					</Link>
					<Link
						to="/wishlist"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaHeart />
						Wishlist
					</Link>
					<Link
						to="/cart"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaShoppingCart />
						Cart
					</Link>
					<Link
						to="address"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaAddressCard />
						Address
					</Link>
					<Link
						to="orderHistory"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaShoppingBag />
						Orders
					</Link>
					<Link
						to="/wallet"
						className="text-black hover:text-gray-700 flex flex-row gap-2 items-center"
					>
						<FaWallet />
						Wallet
					</Link>
				</nav>
				<button
					onClick={handleLogOut}
					className="mt-5 block text-white p-2 rounded-sm bg-black hover:text-gray-700 w-full text-center"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfileSideBar;
