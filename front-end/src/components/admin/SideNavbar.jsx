import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";
import api from "../../config/axiosConfig";

const SideNavbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await api.post("users/logout");
		dispatch(logoutUser());
		navigate("/login");
	};
	return (
		<>
			<div>
				<div className="ml-6 mt-4">
					<h1 className="text-black font-bold text-xl">Admin Dashboard</h1>
					<ul className="mt-8 flex flex-col gap-5">
						<li className="text-gray-600 font-semibold hover:text-black">
							<Link to={"#"}>Dashboard</Link>
						</li>
						<li className="text-gray-600 font-semibold  hover:text-black ">
							<Link to={"products"}>Products</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"categorys"}>Categories</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"#"}>Orders</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"#"}>Coupens</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"#"}>Customers</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"#"}>Orders</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black">
							{" "}
							<Link to={"#"}>Sales Report</Link>
						</li>
					</ul>
					<button
						className="mt-6 bg-black py-1 px-4 text-white font-semibold rounded-sm"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
