import React, { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderDetailses = () => {
	const [orderData, setOrderData] = useState(null);
	const [productData, setProductData] = useState(null);
	const location = useLocation();
	const { orderId, itemId } = location.state;
	console.log("orderId:", orderId, "itemid:", itemId);

	const fetOrderDetails = async () => {
		try {
			const response = await api.get("/order/single-orderDetails", {
				params: {
					orderId,
					itemId,
				},
			});
			console.log(response, "the data");

			setOrderData(response.data.order);
			setProductData(response.data.item);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetOrderDetails();
	}, []);

	const generateInvoiceNumber = () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let invoiceNumber = "INV";
		for (let i = 0; i < 10; i++) {
			invoiceNumber += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return invoiceNumber;
	};

	const downloadPDF = () => {
		const doc = new jsPDF();
		const invoiceNumber = generateInvoiceNumber();

		doc.setFontSize(18);
		doc.text("Bill Invoice", 105, 20, null, null, "center");

		doc.setFontSize(12);
		doc.text("Sold by: Active Edge", 10, 30);
		doc.text("Ship-from Address: Bangalore", 10, 35);
		doc.text("GSTIN: 29AACCF0683K1ZD", 10, 40);

		doc.text(`Invoice Number: ${invoiceNumber}`, 140, 40);

		doc.text("Order Details:", 10, 50);
		doc.text(`Order ID: ${orderId}`, 10, 55);
		doc.text(`Order Date: ${orderData?.orderDate}`, 10, 60);

		doc.text("Billing Address:", 10, 70);
		doc.text(`Name: ${orderData?.shippingAddress?.name}`, 10, 75);
		doc.text(
			`Address: ${orderData?.shippingAddress?.address}, ${orderData?.shippingAddress?.city}, ${orderData?.shippingAddress?.state}, ${orderData?.shippingAddress?.pinCode}`,
			10,
			80
		);
		doc.text(`Phone: ${orderData?.shippingAddress?.phone}`, 10, 90);

		doc.autoTable({
			startY: 100,
			head: [["Product Name", "Quantity", "Price (Rs)", "Total (Rs)"]],
			body: [
				[
					`${productData?.productId?.productName}`,
					`${productData?.quantity}`,
					`Rs ${
						productData?.priceDetails?.discountedPrice
							? productData?.priceDetails?.discountedPrice
							: productData?.priceDetails?.originalPrice
					}`,
					`Rs ${
						productData?.priceDetails?.discountedPrice
							? productData?.priceDetails?.discountedPrice *
							  productData?.quantity
							: productData?.priceDetails?.originalPrice * productData?.quantity
					}`,
				],
			],
		});

		let finalY = doc.autoTable.previous.finalY + 10;
		doc.setFontSize(16);
		doc.text("Grand Total:", 130, finalY);
		doc.text(
			`Rs ${
				productData?.priceDetails?.discountedPrice
					? productData?.priceDetails?.discountedPrice * productData?.quantity
					: productData?.priceDetails?.originalPrice * productData?.quantity
			}`,
			175,
			finalY
		);

		doc.save(`Order_${orderId}.pdf`);
	};

	return (
		<div className="max-w-6xl mx-auto p-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-4 shadow-md rounded-lg md:col-span-2">
					<h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
					<p className="font-semibold">{orderData?.shippingAddress?.name}</p>
					<p>{`${orderData?.shippingAddress?.address},${orderData?.shippingAddress?.city},${orderData?.shippingAddress?.state},${orderData?.shippingAddress?.pinCode}`}</p>
					<p className="mt-2 font-semibold">
						{orderData?.shippingAddress?.phone}
					</p>
					<p className="mt-2 text-gray-600">
						{`This order is also tracked by ${orderData?.shippingAddress?.phone}`}
					</p>
				</div>

				{/* Rewards Section */}
				<div className="bg-white p-4 shadow-md rounded-lg">
					<h2 className="text-lg font-semibold mb-2">More actions</h2>
					<p className="text-yellow-600">Download Invoice</p>
					<button
						onClick={downloadPDF}
						className="mt-4 rounded-sm py-1 px-2 text-white bg-black"
					>
						Download
					</button>
				</div>
			</div>

			{/* Order Item Section */}
			<div className="bg-white p-4 shadow-md rounded-lg mt-4">
				<div className="flex items-start">
					<img
						src={productData?.productId?.thumbnail}
						alt={productData?.productId?.productName}
						className="w-16 h-16 object-cover mr-4"
					/>
					<div className="flex-1">
						<h3 className="font-semibold">
							{productData?.productId?.productName}
						</h3>
						<p>Size: {productData?.size}</p>
						<p>Quantity: {productData?.quantity}</p>
						<p className="text-green-600 mt-2">
							₹
							{productData?.priceDetails?.discountedPrice
								? productData?.priceDetails?.discountedPrice
								: productData?.priceDetails?.originalPrice}
						</p>
						<div className="flex justify-between mt-4">
							<div className="flex items-center">
								<span className="text-green-500">{productData?.status}</span>
								<span className="mx-2">|</span>
								<span className="text-red-500">{orderData?.paymentMethod}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailses;
