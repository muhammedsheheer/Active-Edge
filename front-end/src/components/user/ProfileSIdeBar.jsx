import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

const ProfileSideBar = ({ closeSidebar }) => {
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
		<div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-xl font-semibold mb-6">Account Info</h2>
			<nav className="space-y-4">
				<Link
					to="editProfile"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaUser />
					Profile
				</Link>
				<Link
					to="/wishlist"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaHeart />
					Wishlist
				</Link>
				<Link
					to="/cart"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaShoppingCart />
					Cart
				</Link>
				<Link
					to="address"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaAddressCard />
					Address
				</Link>
				<Link
					to="orderHistory"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaShoppingBag />
					Orders
				</Link>
				<Link
					to="wallet"
					onClick={closeSidebar}
					className="flex items-center gap-2"
				>
					<FaWallet />
					Wallet
				</Link>
			</nav>
			<button
				onClick={handleLogOut}
				className="mt-6 w-full bg-black text-white py-2 rounded-md"
			>
				Logout
			</button>
		</div>
	);
};

export default ProfileSideBar;
