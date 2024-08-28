import React, { useState, useEffect } from "react";

const CouponModal = ({ purchaseAmount, coupons, onSelectCoupon, onClose }) => {
	const [filteredCoupons, setFilteredCoupons] = useState([]);

	useEffect(() => {
		const applicableCoupons = coupons.filter(
			(coupon) => purchaseAmount >= coupon.minimumPurchaseAmount
		);
		setFilteredCoupons(applicableCoupons);
	}, [purchaseAmount, coupons]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white rounded-lg p-6 w-96">
				<h2 className="text-lg font-bold mb-4">Available Coupons</h2>
				{filteredCoupons.length > 0 ? (
					<ul>
						{filteredCoupons.map((coupon) => (
							<li
								key={coupon.code}
								className="mb-3 p-4 border border-gray-300 rounded-lg shadow-sm"
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="font-semibold">{coupon.code}</p>
										<p className="text-sm">
											Min. Purchase: ₹{coupon.minimumPurchaseAmount}
										</p>
										<p className="text-sm">
											Discount: {coupon.discountPercentage}% (Up to ₹
											{coupon.maxDiscountAmount})
										</p>
									</div>
									<button
										className="bg-rose-500 text-white px-2 py-1 rounded-md"
										onClick={() => onSelectCoupon(coupon)}
									>
										Apply
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-sm">
						No coupons available for your purchase amount.
					</p>
				)}
				<button
					className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default CouponModal;
