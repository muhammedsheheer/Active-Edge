// import React, { useState, useEffect } from "react";

// const CouponModal = ({ purchaseAmount, coupons, onSelectCoupon, onClose }) => {
// const [filteredCoupons, setFilteredCoupons] = useState([]);

// useEffect(() => {
// 	const applicableCoupons = coupons.filter(
// 		(coupon) => purchaseAmount >= coupon.minimumPurchaseAmount
// 	);
// 	setFilteredCoupons(applicableCoupons);
// }, [purchaseAmount, coupons]);

// 	return (
// 		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
// 			<div className="bg-white rounded-lg p-4 w-[32rem] max-h-[60vh] overflow-y-auto">
// 				<h2 className="text-lg font-bold mb-4">Available Coupons</h2>
// 				{filteredCoupons.length > 0 ? (
// 					<ul>
// 						{filteredCoupons.map((coupon) => (
// 							<li
// 								key={coupon.code}
// 								className="mb-3 p-3 border border-gray-300 rounded-lg shadow-sm"
// 							>
// 								<div className="flex justify-between items-center">
// 									<div>
// 										<p className="font-semibold">{coupon.code}</p>
// 										<p className="text-sm">
// 											Min. Purchase: ₹{coupon.minimumPurchaseAmount}
// 										</p>
// 										<p className="text-sm">
// 											Discount: {coupon.discountPercentage}% (Up to ₹
// 											{coupon.maxDiscountAmount})
// 										</p>
// 									</div>
// 									<button
// 										className="bg-rose-500 text-white px-2 py-1 rounded-md"
// 										onClick={() => onSelectCoupon(coupon)}
// 									>
// 										Apply
// 									</button>
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				) : (
// 					<p className="text-sm">
// 						No coupons available for your purchase amount.
// 					</p>
// 				)}
// 				<button
// 					className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
// 					onClick={onClose}
// 				>
// 					Close
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default CouponModal;

// import React, { useState, useEffect } from "react";

// const CouponModal = ({ purchaseAmount, coupons, onApplyCoupon, onClose }) => {
// 	const [filteredCoupons, setFilteredCoupons] = useState([]);
// 	const [selectedCoupon, setSelectedCoupon] = useState(null);

// 	useEffect(() => {
// 		const applicableCoupons = coupons.filter(
// 			(coupon) => purchaseAmount >= coupon.minimumPurchaseAmount
// 		);
// 		setFilteredCoupons(applicableCoupons);
// 	}, [purchaseAmount, coupons]);

// 	const handleCouponSelect = (coupon) => {
// 		setSelectedCoupon(coupon);
// 	};

// 	const handleApplyCoupon = () => {
// 		if (selectedCoupon) {
// 			onApplyCoupon(selectedCoupon);
// 		}
// 		onClose();
// 	};

// 	return (
// 		<div
// 			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
// 			style={{ zIndex: 10000 }} // Ensure the modal is above everything else
// 		>
// 			<div className="bg-white rounded-lg p-4 w-[32rem]">
// 				<div className="flex justify-between items-center mb-4">
// 					<h2 className="text-lg font-bold">APPLY COUPON</h2>
// 					<button className="text-black" onClick={onClose}>
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							fill="none"
// 							viewBox="0 0 24 24"
// 							stroke="currentColor"
// 							className="w-6 h-6"
// 						>
// 							<path
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								strokeWidth={2}
// 								d="M6 18L18 6M6 6l12 12"
// 							/>
// 						</svg>
// 					</button>
// 				</div>
// 				<div className="mb-4">
// 					<input
// 						type="text"
// 						placeholder="Enter coupon code"
// 						className="border border-gray-300 rounded-lg p-2 w-full"
// 					/>
// 					<button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-md">
// 						CHECK
// 					</button>
// 				</div>
// 				{filteredCoupons.length > 0 ? (
// 					<ul
// 						className={`overflow-y-auto ${
// 							filteredCoupons.length > 2 ? "max-h-60" : ""
// 						}`}
// 					>
// 						{filteredCoupons.map((coupon) => (
// 							<li
// 								key={coupon.code}
// 								className={`mb-3 p-3 border rounded-lg shadow-sm ${
// 									selectedCoupon?.code === coupon.code
// 										? "border-pink-500 bg-pink-50"
// 										: "border-gray-300"
// 								}`}
// 							>
// 								<div className="flex justify-between items-center">
// 									<div>
// 										<div className="flex items-center mb-2">
// 											<input
// 												type="checkbox"
// 												checked={selectedCoupon?.code === coupon.code}
// 												onChange={() => handleCouponSelect(coupon)}
// 												className="mr-2"
// 											/>
// 											<span
// 												className={`font-semibold ${
// 													selectedCoupon?.code === coupon.code
// 														? "text-pink-500"
// 														: "text-black"
// 												}`}
// 											>
// 												{coupon.code}
// 											</span>
// 										</div>
// 										<p className="text-sm font-bold">
// 											Save ₹{coupon.maxDiscountAmount}
// 										</p>
// 										<p className="text-sm">
// 											Rs. {coupon.maxDiscountAmount} off on minimum purchase of
// 											Rs. {coupon.minimumPurchaseAmount}.
// 										</p>
// 										<p className="text-sm text-gray-500">
// 											Expires on: {new Date(coupon.expiryDate).toLocaleString()}
// 										</p>
// 									</div>
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				) : (
// 					<p className="text-sm">
// 						No coupons available for your purchase amount.
// 					</p>
// 				)}
// 				<div className="border-t border-gray-300 pt-4 mt-4">
// 					<div className="flex justify-between items-center">
// 						<p className="text-sm font-bold">Maximum savings:</p>
// 						<p className="text-lg font-bold">
// 							₹{selectedCoupon ? selectedCoupon.maxDiscountAmount : 0}
// 						</p>
// 					</div>
// 					<button
// 						className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md w-full"
// 						onClick={handleApplyCoupon}
// 						disabled={!selectedCoupon}
// 					>
// 						APPLY
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CouponModal;

import React, { useEffect, useState } from "react";

const CouponModal = ({
	coupons,
	onSelectCoupon,
	closeModal,
	appliedCoupon,
	purchaseAmount,
}) => {
	const [filteredCoupons, setFilteredCoupons] = useState([]);

	useEffect(() => {
		const applicableCoupons = coupons.filter(
			(coupon) => purchaseAmount >= coupon.minimumPurchaseAmount
		);
		setFilteredCoupons(applicableCoupons);
	}, [purchaseAmount, coupons]);
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-md w-96">
				<h2 className="text-lg font-semibold mb-4">Available Coupons</h2>
				{filteredCoupons.length === 0 ? (
					<p className="text-gray-600">No coupons available</p>
				) : (
					<ul>
						{filteredCoupons.map((coupon) => (
							<li
								key={coupon._id}
								className={`p-4 mb-2 border rounded-md cursor-pointer ${
									appliedCoupon?.code === coupon.code
										? "bg-green-100"
										: "hover:bg-gray-100"
								}`}
								onClick={() => onSelectCoupon(coupon)}
							>
								<div className="flex justify-between items-center">
									<span className="font-medium">{coupon.code}</span>
									{appliedCoupon?.code === coupon.code && (
										<span className="text-green-600 font-semibold">
											Applied
										</span>
									)}
								</div>
								<p className="text-gray-500 text-sm">
									{coupon.discountPercentage}% off - Min Purchase: ₹
									{coupon.minimumPurchaseAmount}
								</p>
							</li>
						))}
					</ul>
				)}
				<button
					className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition duration-300"
					onClick={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default CouponModal;
