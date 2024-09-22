import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
	const navigate = useNavigate();
	const handleHome = () => {
		navigate("/");
	};
	const handleOrder = () => {
		navigate("/profile/orderHistory");
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
			<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate__animated animate__fadeIn">
				<div className="flex justify-center mb-6">
					<div className="bg-green-100 p-4 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							className="w-10 h-10 text-green-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>
				<h2 className="text-center text-2xl font-bold text-green-700 mb-4">
					Order Confirmed
				</h2>
				<p className="text-center text-gray-600 mb-8">
					Your order has been successfully confirmed. You will receive an email
					or SMS with your order confirmation details shortly.
				</p>
				<div className="flex flex-col gap-4">
					<button
						onClick={handleOrder}
						className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
					>
						Order Details
					</button>
					<button
						onClick={handleHome}
						className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
					>
						Continue to Shop
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderConfirmation;
