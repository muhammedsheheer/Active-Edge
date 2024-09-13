import React, { useState } from "react";
import api from "../../config/axiosConfig";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const BrandModal = ({ openAdd, handleCloseModal, fetchBrand }) => {
	const [brandName, setBrandName] = useState("");
	const [brandTitle, setBrandTitle] = useState("");
	const [logo, setLogo] = useState(null);
	const [logoPreview, setLogoPreview] = useState(null);
	const [errors, setErrors] = useState({});
	const [imageError, setImageError] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const validImageType = ["image/png", "image/jpeg"];
			if (validImageType.includes(file.type)) {
				const reader = new FileReader();
				reader.onload = (e) => {
					setLogo(e.target.result);
					setLogoPreview(e.target.result);
					setImageError("");
				};
				reader.readAsDataURL(file);
			} else {
				setImageError("Please upload a PNG or JPEG file");
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!brandName.trim()) {
			newErrors.brandName = "Brand Name is required";
		} else if (brandName.trim().length < 3) {
			newErrors.brandName = "Brand Name must be at least 3 characters long";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setIsSaving(true);

		try {
			const response = await api.post("/brands/createBrand", {
				brandName,
				brandTitle,
				logo,
			});
			toast.success(response.data.message);
			fetchBrand();
			handleCloseModal();
			setBrandName("");
			setBrandTitle("");
			setLogoPreview(null);
		} catch (error) {
			toast.error(error.response?.data?.message || "Error adding the brand");
		} finally {
			setIsSaving(false);
		}
	};

	if (!openAdd) return null;

	return (
		<>
			{isSaving && <Spinner />}
			<div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
				<div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Create Brand</h2>
						<button
							onClick={handleCloseModal}
							className="text-gray-500 hover:text-gray-700"
						>
							&times;
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Brand Name:
							</label>
							<input
								type="text"
								className={`mt-1 block w-full p-2 border ${
									errors.brandName ? "border-red-500" : "border-gray-300"
								} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
								value={brandName}
								onChange={(e) => setBrandName(e.target.value)}
							/>
							{errors.brandName && (
								<p className="text-red-500 text-sm mt-1">{errors.brandName}</p>
							)}
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Brand Title (Optional):
							</label>
							<input
								type="text"
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								value={brandTitle}
								onChange={(e) => setBrandTitle(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Upload Logo:
							</label>
							<div className="relative">
								{logoPreview ? (
									<img
										src={logoPreview}
										alt="Logo Preview"
										className="w-32 h-32 object-contain rounded-md shadow-sm"
									/>
								) : (
									<div className="w-32 h-32 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
										No Image
									</div>
								)}
								<label
									htmlFor="imageUpload"
									className="absolute bottom-0 right-0 bg-black p-3 rounded-full cursor-pointer shadow-md hover:bg-gray-800 transition duration-300"
								>
									<FaCamera className="text-white" />
								</label>
								<input
									type="file"
									id="imageUpload"
									className="hidden"
									onChange={handleImageUpload}
									accept="image/*"
								/>
							</div>
							{imageError && <p className="text-red-500 mt-2">{imageError}</p>}
						</div>
						<div className="flex justify-end space-x-2">
							<button
								type="button"
								onClick={handleCloseModal}
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isSaving}
								className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black"
							>
								{isSaving ? <Spinner /> : "Add Brand"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default BrandModal;
