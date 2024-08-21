import React, { useState } from "react";

const BankOffer = () => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className="border border-gray-300 p-3 rounded-lg bg-white mb-4 w-3/4">
			<div className="flex items-center mb-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 text-gray-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-3l4-8h1v4h3l-4 8z"
					/>
				</svg>
				<h3 className="ml-2 text-gray-800 font-medium text-sm">Bank Offer</h3>
			</div>
			<p className="text-gray-700 text-xs">
				Flat $0.60 Cashback on Mobikwik wallet transaction on a minimum spend of
				$18.00. TCA
			</p>
			{showMore && (
				<p className="text-gray-700 text-xs mt-1">
					Extra details about the offer, terms and conditions, and any
					additional information.
				</p>
			)}
			<button
				className="text-red-500 font-medium text-xs mt-1 focus:outline-none"
				onClick={() => setShowMore(!showMore)}
			>
				{showMore ? "Show Less ▲" : "Show More ▼"}
			</button>
		</div>
	);
};

export default BankOffer;
