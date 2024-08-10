import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";
import api from "../../config/axiosConfig";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const [imageData, setImageData] = useState({ dpImage: null });

	const fetchUserDetails = async () => {
		try {
			const response = await api.get("/users/getUserDetails");
			console.log(response);

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
			dispatch(setWishlist([]));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-8">
			<div className="flex flex-col items-center lg:items-start">
				<img
					src={imageData.dpImage}
					alt={userDetails.name}
					className="rounded-full w-24 h-24 mb-4"
				/>
				<h2 className="text-xl font-semibold">{userDetails.name}</h2>
				<p className="text-gray-500">{userDetails.email}</p>
				<nav className="mt-4 space-y-2">
					<Link
						to="/edit-profile"
						className="block text-black hover:text-gray-700"
					>
						Edit Profile
					</Link>
					<Link
						to="/notifications"
						className="block text-black hover:text-gray-700"
					>
						Notifications
					</Link>
					<Link to="/wishlist" className="block text-black hover:text-gray-700">
						Wishlist
					</Link>
					<Link to="/cart" className="block text-black hover:text-gray-700">
						Cart
					</Link>
					<Link
						to="/privacy-policy"
						className="block text-black hover:text-gray-700"
					>
						Privacy Policy
					</Link>
					<Link to="/wallet" className="block text-black hover:text-gray-700">
						Wallet
					</Link>
					<button
						onClick={handleLogOut}
						className="block text-white p-1.5 rounded-sm bg-black hover:text-gray-700"
					>
						Logout
					</button>
				</nav>
			</div>
			<div className="flex-grow mt-8 lg:mt-0 lg:ml-16">
				<div className="bg-white shadow-md rounded p-4 lg:p-8">
					<div className="space-y-4">
						<div className="flex justify-between">
							<span className="text-gray-700">Name</span>
							<span className="text-black">{userDetails.name}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-700">Email</span>
							<span className="text-black">{userDetails.email}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-700">Mobile Number</span>
							<span className="text-black">{userDetails.phone}</span>
						</div>
					</div>
					<button className="mt-4 w-full bg-black text-white py-2 rounded">
						Edit
					</button>
					<button className="mt-4 w-full bg-black text-white py-2 rounded">
						Shipping Address
					</button>
					<button className="mt-4 w-full bg-black text-white py-2 rounded">
						Order History
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
