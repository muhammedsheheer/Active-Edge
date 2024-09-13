import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";
import api from "../../config/axiosConfig";
import {
	FaTachometerAlt,
	FaChartLine,
	FaTags,
	FaBoxOpen,
	FaClipboardList,
	FaUsers,
	FaGift,
	FaReceipt,
	FaUndoAlt,
	FaSignOutAlt,
} from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";

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
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaTachometerAlt className="mr-2" />
							<Link to={"/dashboard"}>Dashboard</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaChartLine className="mr-2" />
							<Link to={"bestSelling"}>Best Selling</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaBoxOpen className="mr-2" />
							<Link to={"products"}>Products</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaTags className="mr-2" />
							<Link to={"categorys"}>Categories</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<SiBrandfolder className="mr-2" />
							<Link to={"brands"}>Brands</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaGift className="mr-2" />
							<Link to={"offers"}>Offers</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaClipboardList className="mr-2" />
							<Link to={"coupens"}>Coupens</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaUsers className="mr-2" />
							<Link to={"customers"}>Customers</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaReceipt className="mr-2" />
							<Link to={"orders"}>Orders</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaUndoAlt className="mr-2" />
							<Link to={"returnes"}>Return Orders</Link>
						</li>
						<li className="text-gray-600 font-semibold hover:text-black flex items-center">
							<FaChartLine className="mr-2" />
							<Link to={"salesReport"}>Sales Report</Link>
						</li>
					</ul>
					<button
						className="mt-6 bg-black py-1 px-4 text-white font-semibold rounded-sm flex items-center"
						onClick={handleLogout}
					>
						<FaSignOutAlt className="mr-2" />
						Logout
					</button>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
