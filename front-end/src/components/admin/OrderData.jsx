// import React, { useEffect, useState } from "react";
// import api from "../../config/axiosConfig";
// import ReusableTable from "./ReusableTableData";
// import BreadCrumbWithButton from "./BreadCrumbWithButton";
// import { useLocation, useNavigate } from "react-router-dom";

// const OrderData = () => {
// 	const [getOrderData, setGetOrderData] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState("");
// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	const handleOrderDetails = (orderId) => {
// 		navigate(`/dashboard/orderDetails/${orderId}`);
// 	};

// 	useEffect(() => {
// 		const fetchOrders = async () => {
// 			try {
// 				const response = await api.get("/order/get-order-data");
// 				console.log("API Response:", response);
// 				setGetOrderData(response.data.order);
// 			} catch (error) {
// 				console.error("Error fetching orders:", error.message);
// 				setError("Failed to load order data.");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchOrders();
// 	}, []);

// 	const columns = [
// 		{ label: "#ID", field: "id" },
// 		{ label: "Name", field: "name" },
// 		{ label: "Phone", field: "phone" },
// 		{ label: "Shipping Address", field: "shipping" },
// 		{ label: "Total", field: "total" },
// 		{ label: "Status", field: "status" },
// 		{ label: "Date", field: "date" },
// 		{ label: "Action", field: "action" },
// 	];

// 	const orderData = getOrderData?.map((order, index) => ({
// 		id: order?._id,
// 		name: order?.shippingAddress?.name,
// 		phone: order?.shippingAddress?.phone,
// 		shipping: `${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.pinCode}`,
// 		total: `$${order?.theTotelAmount}`,
// 		status: (
// 			<div
// 				className={`text-center rounded-md py-1 px-2 font-semibold ${
// 					order?.orderStatus === "Pending"
// 						? "bg-yellow-100 text-yellow-500"
// 						: order?.orderStatus === "Shipped"
// 						? "bg-blue-100 text-blue-500"
// 						: order?.orderStatus === "Delivered"
// 						? "bg-green-100 text-green-500"
// 						: order?.orderStatus === "Cancelled"
// 						? "bg-gray-100 text-gray-500"
// 						: "bg-red-100 text-red-600"
// 				}`}
// 			>
// 				{order?.orderStatus}
// 			</div>
// 		),
// 		date: new Date(order?.orderDate).toLocaleDateString(),
// 		action: (
// 			<div className="flex space-x-2">
// 				<button
// 					onClick={() => handleOrderDetails(order._id)}
// 					className="py-1 px-2 text-white font-semibold rounded bg-blue-500 hover:bg-blue-600"
// 				>
// 					Details
// 				</button>
// 			</div>
// 		),
// 	}));

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}

// 	if (error) {
// 		return <div>{error}</div>;
// 	}

// 	return (
// 		<>
// 			<BreadCrumbWithButton
// 				componentLocation={"Orders"}
// 				noButton={false}
// 				location={location.pathname}
// 			/>
// 			<ReusableTable columns={columns} data={orderData} />
// 		</>
// 	);
// };

// export default OrderData;

import React, { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import ReusableTable from "./ReusableTableData";
import BreadCrumbWithButton from "./BreadCrumbWithButton";
import Pagination from "../common/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const OrderData = () => {
	const [getOrderData, setGetOrderData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const ordersPerPage = 7;

	const location = useLocation();
	const navigate = useNavigate();

	const handleOrderDetails = (orderId) => {
		navigate(`/dashboard/orderDetails/${orderId}`);
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await api.get("/order/get-order-data");
				console.log("API Response:", response);
				setGetOrderData(response.data.order);
			} catch (error) {
				console.error("Error fetching orders:", error.message);
				setError("Failed to load order data.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = getOrderData.slice(indexOfFirstOrder, indexOfLastOrder);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Name", field: "name" },
		{ label: "Phone", field: "phone" },
		{ label: "Shipping Address", field: "shipping" },
		{ label: "Total", field: "total" },
		{ label: "Status", field: "status" },
		{ label: "Date", field: "date" },
		{ label: "Action", field: "action" },
	];

	const orderData = currentOrders.map((order, index) => ({
		serialNo: indexOfFirstOrder + index + 1,
		name: order?.shippingAddress?.name,
		phone: order?.shippingAddress?.phone,
		shipping: `${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.pinCode}`,
		total: `$${order?.theTotelAmount}`,
		status: (
			<div
				className={`text-center rounded-md py-1 px-2 font-semibold ${
					order?.orderStatus === "Pending"
						? "bg-yellow-100 text-yellow-500"
						: order?.orderStatus === "Shipped"
						? "bg-blue-100 text-blue-500"
						: order?.orderStatus === "Delivered"
						? "bg-green-100 text-green-500"
						: order?.orderStatus === "Cancelled"
						? "bg-gray-100 text-gray-500"
						: "bg-red-100 text-red-600"
				}`}
			>
				{order?.orderStatus}
			</div>
		),
		date: new Date(order?.orderDate).toLocaleDateString(),
		action: (
			<div className="flex space-x-2">
				<button
					onClick={() => handleOrderDetails(order._id)}
					className="py-1 px-2 text-white font-semibold rounded bg-blue-500 hover:bg-blue-600"
				>
					Details
				</button>
			</div>
		),
	}));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<BreadCrumbWithButton
				componentLocation={"Orders"}
				noButton={false}
				location={location.pathname}
			/>
			<ReusableTable columns={columns} data={orderData} />
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(getOrderData.length / ordersPerPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
};

export default OrderData;
