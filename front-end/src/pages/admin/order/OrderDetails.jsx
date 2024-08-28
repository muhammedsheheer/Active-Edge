import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";

const OrderDetails = () => {
	const [orderData, setOrderData] = useState([]);
	const { id } = useParams();
	const location = useLocation();

	useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				const response = await api.get(`/order/get-order-details/${id}`);
				setOrderData(response.data.order);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrderDetails();
	}, [id]);

	const handleProductStatusChange = async (productId, newStatus) => {
		try {
			await api.put(`/order/update-product-status/${id}`, {
				productId,
				newStatus,
			});
			setOrderData((prevOrderData) => {
				const updatedItems = prevOrderData.items.map((item) =>
					item.productId._id === productId
						? { ...item, status: newStatus }
						: item
				);
				return { ...prevOrderData, items: updatedItems };
			});
		} catch (error) {
			console.log("Failed to update product status:", error);
		}
	};

	const renderStatusOptions = (currentStatus) => {
		let availableOptions = [];
		switch (currentStatus) {
			case "Pending":
				availableOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];
				break;
			case "Shipped":
				availableOptions = ["Shipped", "Delivered", "Cancelled"];
				break;
			case "Delivered":
				availableOptions = ["Delivered"];
				break;
			case "Cancelled":
				availableOptions = ["Cancelled"];
				break;
			default:
				availableOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];
				break;
		}
		return availableOptions.map((status) => (
			<option key={status} value={status}>
				{status}
			</option>
		));
	};

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Product Name", field: "productname" },
		{ label: "Brand", field: "brand" },
		{ label: "Quantity", field: "quantity" },
		{ label: "Price", field: "price" },
		{ label: "Total Price", field: "totalPrice" },
		{ label: "Status", field: "status" },
		{ label: "Date", field: "date" },
	];

	const orderDatas = Array.isArray(orderData?.items)
		? orderData.items.map((item, itemIndex) => ({
				serialNo: itemIndex + 1,
				productname: (
					<div className="flex items-center gap-2">
						<img
							src={item.productId?.thumbnail}
							alt={item.productId?.productName}
							className="h-12 w-12 object-contain"
						/>
						{item.productId?.productName}
					</div>
				),
				brand: item.productId?.brand?.brandName || "Unknown Brand",
				quantity: item.quantity,
				price: `₹${item.productId?.salePrice}`,
				totalPrice: `₹${item.quantity * item.productId?.salePrice}`,
				status: (
					<select
						className={`${
							item.status === "Pending"
								? "bg-yellow-100 text-yellow-700"
								: item.status === "Shipped"
								? "bg-blue-100 text-blue-700"
								: item.status === "Delivered"
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						} px-3 py-2 rounded-md font-semibold text-sm`}
						value={item.status}
						onChange={(e) =>
							handleProductStatusChange(item.productId._id, e.target.value)
						}
					>
						{renderStatusOptions(item.status)}
					</select>
				),
				date: new Date(orderData.orderDate).toLocaleDateString(),
		  }))
		: [];

	return (
		<>
			<BreadCrumbWithButton
				location={location.pathname}
				componentLocation={"Order Details"}
			/>
			<div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
				<div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
					<div className="text-gray-700 font-semibold text-lg mb-4 text-center">
						Order Details
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border-t border-gray-200 pt-4">
						<div className="space-y-2">
							<h2 className="text-gray-500 font-semibold text-sm">
								ORDER DATE
							</h2>
							<p className="text-gray-700 text-sm">
								{new Date(orderData?.orderDate).toLocaleDateString()}
							</p>
							<h2 className="text-gray-500 font-semibold text-sm">
								CUSTOMER NAME
							</h2>
							<p className="text-gray-700 text-sm">
								{orderData?.shippingAddress?.name}
							</p>
						</div>
						<div className="space-y-2">
							<h2 className="text-gray-500 font-semibold text-sm">
								SHIPPING ADDRESS
							</h2>
							<p className="text-gray-700 text-sm">
								{`${orderData?.shippingAddress?.address},`}
							</p>
							<p className="text-gray-700 text-sm">
								{`${orderData?.shippingAddress?.city}, ${orderData?.shippingAddress?.pinCode}`}
							</p>
						</div>
						<div className="space-y-2">
							<h2 className="text-gray-500 font-semibold text-sm">PHONE</h2>
							<p className="text-gray-700 text-sm">
								{orderData?.shippingAddress?.phone}
							</p>
							<h2 className="text-gray-500 font-semibold text-sm">
								ORDER STATUS
							</h2>
							<p className="text-gray-700 text-sm">{orderData?.status}</p>
						</div>
					</div>

					<div className="text-gray-700 font-semibold mt-2 md:mt-0 text-sm text-center">
						Order# {orderData._id}
					</div>

					<ReusableTable columns={columns} data={orderDatas} />

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
						<div>
							<h2 className="text-gray-500 font-semibold text-sm">
								PAYMENT METHOD
							</h2>
							<p className="text-gray-700 mt-1 text-sm">
								{orderData?.paymentMethod}
							</p>
						</div>
						<div>
							<h2 className="text-gray-500 font-semibold text-sm">
								SHIPPING COST
							</h2>
							<p className="text-gray-700 mt-1 text-sm">₹30</p>
						</div>
						<div>
							<h2 className="text-gray-500 font-semibold text-sm">DISCOUNT</h2>
							<p className="text-red-500 mt-1 text-sm">
								₹ {orderData.discount}
							</p>
						</div>
						<div className="col-span-4 text-right">
							<h2 className="text-gray-700 font-semibold text-sm">
								TOTAL AMOUNT
							</h2>
							<p className="text-black font-bold text-lg mt-2">
								₹{orderData?.theTotelAmount}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderDetails;
