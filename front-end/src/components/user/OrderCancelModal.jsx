import React, { useState } from "react";

const CancelModal = ({ isOpen, onClose, onSubmit }) => {
	const [selectedReason, setSelectedReason] = useState("");

	const handleReasonChange = (e) => {
		setSelectedReason(e.target.value);
	};

	const handleSubmit = () => {
		if (selectedReason) {
			onSubmit(selectedReason);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg max-w-md w-full">
				<h2 className="text-xl font-medium mb-4">Cancel Order</h2>
				<p className="text-sm text-gray-700 mb-2">
					Select a reason for cancellation:
				</p>
				<select
					value={selectedReason}
					onChange={handleReasonChange}
					className="w-full border border-gray-300 p-2 rounded-md"
				>
					<option value="">Select a reason</option>
					<option value="Changed my mind">Changed my mind</option>
					<option value="Ordered by mistake">Ordered by mistake</option>
					<option value="Item not needed">Item not needed</option>
					<option value="Found a better price">Found a better price</option>
					<option value="Other">Other</option>
				</select>
				<div className="mt-4 flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="bg-black hover:bg-gray-700 text-white py-2 px-4 rounded-md"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CancelModal;
