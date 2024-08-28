import React, { useState } from "react";

const CouponModal = ({ isOpen, onClose, onSave }) => {
	const [formData, setFormData] = useState({
		code: "",
		discountPercentage: "",
		minimumPurchaseAmount: "",
		maxDiscountAmount: "",
		expiryDate: "",
	});

	const [errors, setErrors] = useState({});

	const validate = () => {
		let formErrors = {};

		if (!formData.code.trim()) {
			formErrors.code = "Code is required";
		}

		if (!formData.discountPercentage) {
			formErrors.discountPercentage = "Discount percentage is required";
		} else if (formData.discountPercentage <= 0) {
			formErrors.discountPercentage =
				"Discount percentage must be greater than zero";
		}

		if (!formData.minimumPurchaseAmount) {
			formErrors.minimumPurchaseAmount = "Minimum purchase amount is required";
		} else if (formData.minimumPurchaseAmount <= 0) {
			formErrors.minimumPurchaseAmount =
				"Minimum purchase amount must be greater than zero";
		}

		if (!formData.maxDiscountAmount) {
			formErrors.maxDiscountAmount = "Maximum discount amount is required";
		} else if (formData.maxDiscountAmount <= 0) {
			formErrors.maxDiscountAmount =
				"Maximum discount amount must be greater than zero";
		}

		if (!formData.expiryDate) {
			formErrors.expiryDate = "Expiry date is required";
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			onSave(formData);
			setFormData("");
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
			<div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg h-auto">
				<h2 className="text-xl font-semibold mb-4">Create Coupon</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="block text-gray-700 mb-2" htmlFor="code">
							Code
						</label>
						<input
							type="text"
							id="code"
							name="code"
							value={formData.code}
							onChange={handleInputChange}
							className={`w-full px-3 py-1 border rounded ${
								errors.code ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.code && (
							<p className="text-red-500 text-sm mt-1">{errors.code}</p>
						)}
					</div>

					<div className="mb-3">
						<label
							className="block text-gray-700 mb-2"
							htmlFor="discountPercentage"
						>
							Discount Percentage
						</label>
						<input
							type="number"
							id="discountPercentage"
							name="discountPercentage"
							value={formData.discountPercentage}
							onChange={handleInputChange}
							className={`w-full px-3 py-1 border rounded ${
								errors.discountPercentage ? "border-red-500" : "border-gray-300"
							}`}
							min="1"
						/>
						{errors.discountPercentage && (
							<p className="text-red-500 text-sm mt-1">
								{errors.discountPercentage}
							</p>
						)}
					</div>

					<div className="mb-3">
						<label
							className="block text-gray-700 mb-2"
							htmlFor="minimumPurchaseAmount"
						>
							Minimum Purchase Amount
						</label>
						<input
							type="number"
							id="minimumPurchaseAmount"
							name="minimumPurchaseAmount"
							value={formData.minimumPurchaseAmount}
							onChange={handleInputChange}
							className={`w-full px-3 py-1 border rounded ${
								errors.minimumPurchaseAmount
									? "border-red-500"
									: "border-gray-300"
							}`}
							min="1"
						/>
						{errors.minimumPurchaseAmount && (
							<p className="text-red-500 text-sm mt-1">
								{errors.minimumPurchaseAmount}
							</p>
						)}
					</div>

					<div className="mb-3">
						<label
							className="block text-gray-700 mb-2"
							htmlFor="maxDiscountAmount"
						>
							Maximum Discount Amount
						</label>
						<input
							type="number"
							id="maxDiscountAmount"
							name="maxDiscountAmount"
							value={formData.maxDiscountAmount}
							onChange={handleInputChange}
							className={`w-full px-3 py-1 border rounded ${
								errors.maxDiscountAmount ? "border-red-500" : "border-gray-300"
							}`}
							min="1"
						/>
						{errors.maxDiscountAmount && (
							<p className="text-red-500 text-sm mt-1">
								{errors.maxDiscountAmount}
							</p>
						)}
					</div>

					<div className="mb-3">
						<label className="block text-gray-700 mb-2" htmlFor="expiryDate">
							Expiry Date
						</label>
						<input
							type="date"
							id="expiryDate"
							name="expiryDate"
							value={formData.expiryDate}
							onChange={handleInputChange}
							className={`w-full px-3 py-1 border rounded ${
								errors.expiryDate ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.expiryDate && (
							<p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
						)}
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							onClick={onClose}
							className="mr-4 px-4 py-2 bg-gray-400 text-white rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-black text-white rounded"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CouponModal;
