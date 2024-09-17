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
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
