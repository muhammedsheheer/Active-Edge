import React from "react";
import { useDispatch } from "react-redux";
import api from "../../config/axiosConfig";
import { logoutUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = async () => {
		await api.post("/users/logout");
		await dispatch(logoutUser());
		navigate("/");
	};

	return (
		<>
			<h1>Profile</h1>
			<button
				className="bg-black rounded-xl px-4 py-2 text-white"
				onClick={handleLogout}
			>
				Logout
			</button>
		</>
	);
};

export default Profile;
