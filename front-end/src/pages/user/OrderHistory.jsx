import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig";
import CancelModal from "../../components/user/OrderCancelModal";
import ReturnModal from "../../components/user/OrderReturnModal";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	const fetchOrders = async () => {
		try {
			const response = await api.get("/order/get-orders");
			console.log("the order", response.data.order);
			const sortedOrders = response.data.order.sort(
				(a, b) => new Date(b.orderDate) - new Date(a.orderDate)
			);
			setOrders(sortedOrders);
		} catch (error) {
			console.error("Error fetching orders:", error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleOrder = (orderId, itemId) => {
		navigate(`/orderDetails/${orderId}`, {
			state: {
				orderId: orderId,
				itemId: itemId,
			},
		});
	};

	const handleStatus = async (orderId, itemId, orderStatus, cancelReason) => {
		try {
			await api.put("/order/user-order-status-change", {
				orderId,
				itemId,
				orderStatus,
				cancelReason,
			});
			fetchOrders();
		} catch (error) {
			console.log(error);
		}
	};

	const handleReturn = async (orderId, itemId, reason) => {
		try {
			await api.post("/order/return-order-request", {
				orderId,
				itemId,
				reason,
			});
			fetchOrders();
		} catch (error) {
			console.log(error);
		}
	};

	const openModal = (order, item, action) => {
		setSelectedOrder(order);
		setSelectedItem(item);

		if (action === "cancel") {
			setIsCancelModalOpen(true);
		} else if (action === "return") {
			setIsReturnModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsCancelModalOpen(false);
		setIsReturnModalOpen(false);
		setSelectedOrder(null);
		setSelectedItem(null);
	};

	const handleCancelSubmit = (reason) => {
		if (selectedOrder && selectedItem) {
			handleStatus(selectedOrder._id, selectedItem._id, "Cancelled", reason);
		}
		closeModal();
	};

	const handleReturnSubmit = (reason) => {
		if (selectedOrder && selectedItem) {
			handleReturn(selectedOrder._id, selectedItem._id, reason);
		}
		closeModal();
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (orders.length === 0) {
		return <p>No orders found.</p>;
	}

	return (
		<div className="bg-gray-100 py-4 px-2">
			<div className="max-w-5xl mx-auto space-y-4">
				{orders.map((order) =>
					order.items.map((item, itemIndex) => (
						<div
							key={itemIndex}
							className="bg-white shadow-md rounded-md overflow-hidden w-full md:max-w-3xl mx-auto"
						>
							<div className="p-4 flex flex-col md:flex-row items-center ">
								{/* Product Image */}
								<div className="md:w-1/4 bg-gray-200 h-48 flex items-center justify-center">
									<img
										onClick={() => handleOrder(order._id, item._id)}
										src={item.productId.thumbnail}
										alt={item.productId.productName}
										className="object-contain h-full w-full cursor-pointer"
									/>
								</div>

								{/* Product Details */}
								<div className="md:w-2/4 p-3">
									<h3 className="text-sm font-medium text-gray-800">
										{item.productId.productName}
									</h3>
									<p className="text-sm text-gray-600">
										Brand: {item.productId.brand.brandName}
									</p>
									<p className="text-sm text-gray-800 font-medium mt-1">
										Size: {item.size}
									</p>
									<p className="text-sm text-gray-800 font-medium">
										Quantity: {item.quantity}
									</p>
									{/* Order Date */}
									<p className="text-sm text-gray-600 mt-2">
										Order Date: {new Date(order.orderDate).toLocaleDateString()}
									</p>
									{/* Order ID */}
									<p className="text-sm text-gray-600 mt-2">
										Order ID: {order._id}
									</p>
								</div>

								{/* Status and Buttons */}
								<div className="md:w-1/4 p-3 text-right">
									<p
										className={`text-sm font-medium mb-2 ${
											item.status === "Pending"
												? "text-yellow-500"
												: item.status === "Shipped"
												? "text-blue-500"
												: item.status === "Cancelled"
												? "text-red-500"
												: item.status === "Delivered"
												? "text-green-500"
												: item.status === "ReturnInitialized"
												? "text-yellow-500"
												: item.status === "ReturnAccepted"
												? "text-green-500"
												: item.status === "ReturnRejected"
												? "text-red-500"
												: ""
										}`}
									>
										Status: {item.status}
									</p>
									<p className="text-sm text-gray-600 mb-2">
										Payment Method: {order.paymentMethod}
									</p>

									{/* Conditional Button Rendering */}
									<div>
										{item.status === "Pending" || item.status === "Shipped" ? (
											<button
												onClick={() => openModal(order, item, "cancel")}
												className="w-full bg-black hover:bg-gray-700 text-white text-sm font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out"
											>
												Cancel Item
											</button>
										) : item.status === "Delivered" ? (
											<button
												onClick={() => openModal(order, item, "return")}
												className="w-full bg-black hover:bg-gray-700 text-white text-sm font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out"
											>
												Request Refund
											</button>
										) : item.status === "ReturnInitialized" ? (
											<button
												disabled
												className="w-full bg-gray-400 text-white text-sm font-medium py-1 px-2 rounded-md"
											>
												Request Refund
											</button>
										) : item.status ===
										  "ReturnAccepted" ? null : item.status ===
										  "ReturnRejected" ? (
											<button
												onClick={() => openModal(order, item, "return")}
												className="w-full bg-black hover:bg-gray-700 text-white text-sm font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out"
											>
												Retry Return
											</button>
										) : item.status === "Cancelled" ? (
											<button className="w-full bg-black hover:bg-gray-700 text-white text-sm font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out hidden">
												Cancelled
											</button>
										) : null}
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Cancel Modal */}
			<CancelModal
				isOpen={isCancelModalOpen}
				onClose={closeModal}
				onSubmit={handleCancelSubmit}
			/>

			{/* Return Modal */}
			<ReturnModal
				isOpen={isReturnModalOpen}
				onClose={closeModal}
				onSubmit={handleReturnSubmit}
			/>
		</div>
	);
};

export default OrderHistory;
