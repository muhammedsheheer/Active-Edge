import React from "react";

const OrderDetailses = () => {
	return (
		<div className="max-w-6xl mx-auto p-4">
			{/* Delivery Address and Rewards Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Delivery Address */}
				<div className="bg-white p-4 shadow-md rounded-lg md:col-span-2">
					<h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
					<p className="font-semibold">Sheheer</p>
					<p>
						Cheloor peedikayil house cheloor thali po thrissur dt Ittonam
						cheloor, Chel...
					</p>
					<p className="mt-2 font-semibold">Phone number</p>
					<p>7306158143, 9539235215</p>
					<p className="mt-2 text-gray-600">
						This order is also tracked by 7306158143
					</p>
				</div>

				{/* Rewards Section */}
				<div className="bg-white p-4 shadow-md rounded-lg">
					<h2 className="text-lg font-semibold mb-2">Your Rewards</h2>
					<p className="text-yellow-600">Early Access to this Sale</p>
					<p>For Flipkart Plus Members</p>
				</div>
			</div>

			{/* Order Item Section */}
			<div className="bg-white p-4 shadow-md rounded-lg mt-4">
				<div className="flex items-start">
					<img
						src="https://via.placeholder.com/150"
						alt="Product"
						className="w-16 h-16 object-cover mr-4"
					/>
					<div className="flex-1">
						<h3 className="font-semibold">
							DivineCrafts Analog 32.5 cm X 32.5 cm Wa...
						</h3>
						<p>Color: Multicolor Size: 7</p>
						<p>Seller: DivineCrafts</p>
						<p className="text-green-600 mt-2">₹306 1 Offer Applied</p>
						<div className="flex justify-between mt-4">
							<div className="flex items-center">
								<span className="text-green-500">Order Confirmed</span>
								<span className="mx-2">|</span>
								<span className="text-red-500">Cancelled</span>
							</div>
							<div>
								<a href="#" className="text-blue-500">
									Chat with us
								</a>
							</div>
						</div>
						<div className="mt-2 text-sm">
							<p>
								You requested a cancellation because of issues with the delivery
								date.
							</p>
							<p>Mon, 26th Aug 3:27 pm Item cancelled by you</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailses;
