import React from "react";

const Pagination = ({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	if (totalPages <= 1) return null;

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex items-center justify-center space-x-4 mt-4">
			<button
				className={`p-2 rounded ${
					currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300"
				} text-gray-700`}
				onClick={handlePrevious}
				disabled={currentPage === 1}
			>
				Previous
			</button>

			<div className="flex space-x-2">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						className={`p-2 rounded ${
							currentPage === index + 1
								? "bg-black text-white"
								: "bg-gray-200 text-gray-700"
						}`}
						onClick={() => onPageChange(index + 1)}
					>
						{index + 1}
					</button>
				))}
			</div>

			<button
				className={`p-2 rounded ${
					currentPage === totalPages
						? "bg-gray-200 cursor-not-allowed"
						: "bg-gray-300"
				} text-gray-700`}
				onClick={handleNext}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
