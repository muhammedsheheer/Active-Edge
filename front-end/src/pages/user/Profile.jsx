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
		phone: "",
		email: "",
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
		<div className="flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-8 bg-gray-50 min-h-screen">
			<div className="flex flex-col items-center lg:items-start lg:w-1/3">
				<img
					src={imageData.dpImage}
					alt={userDetails.name}
					className="rounded-full w-32 h-32 mb-4 shadow-lg object-cover"
				/>
				<h2 className="text-2xl font-bold text-black">{userDetails.name}</h2>
				<p className="text-gray-600">{userDetails.phone}</p>
				<nav className="mt-6 space-y-3 w-full">
					<Link
						to="/editprofile"
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
						className="block text-white p-2 rounded-sm bg-black hover:text-gray-700 w-full text-center"
					>
						Logout
					</button>
				</nav>
			</div>
			<div className="flex-grow mt-8 lg:mt-0 lg:ml-16">
				<div className="bg-white shadow-lg rounded-lg p-6 lg:p-8">
					<h3 className="text-xl font-semibold mb-4">Profile Information</h3>
					<div className="space-y-4">
						<div className="flex justify-between items-center border-b pb-2">
							<span className="text-gray-700">Name</span>
							<span className="text-black font-medium">{userDetails.name}</span>
						</div>
						<div className="flex justify-between items-center border-b pb-2">
							<span className="text-gray-700">Email</span>
							<span className="text-black font-medium">
								{userDetails.email}
							</span>
						</div>
						<div className="flex justify-between items-center border-b pb-2">
							<span className="text-gray-700">Mobile Number</span>
							<span className="text-black font-medium">
								{userDetails.phone}
							</span>
						</div>
					</div>
					<div className="mt-6">
						<Link
							to="/shipping-address"
							className="block text-center bg-black text-white py-2 rounded mb-3 hover:bg-gray-800"
						>
							Shipping Address
						</Link>
						<Link
							to="/orderHistory"
							className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
						>
							Order History
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
