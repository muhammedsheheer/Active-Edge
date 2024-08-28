import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
				className="bg-gray-300 text-gray-700 p-2 rounded"
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
				className="bg-gray-300 text-gray-700 p-2 rounded"
				onClick={handleNext}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
