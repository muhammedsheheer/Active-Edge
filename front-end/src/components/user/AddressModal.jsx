import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress } from "../../../redux/slices/addressSlice"; // Update the path as needed

const AddressModal = ({ onClose, addressed }) => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.address);

	const [address, setAddress] = useState({
		name: "",
		phone: "",
		address: "",
		locality: "",
		city: "",
		state: "",
		pinCode: "",
		typeofPlace: "Home",
		isDefaultAddress: false,
	});

	useEffect(() => {
		if (addressed) {
			setAddress({
				name: addressed.name || "",
				phone: addressed.phone || "",
				address: addressed.address || "",
				locality: addressed.locality || "",
				city: addressed.city || "",
				state: addressed.state || "",
				pinCode: addressed.pinCode || "",
				typeofPlace: addressed.typeofPlace || "Home",
				isDefaultAddress: addressed.isDefaultAddress || false,
			});
		}
	}, [addressed]);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setAddress({
			...address,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const validateForm = () => {
		const newErrors = {};
		if (!address.name.trim()) newErrors.name = "Name is required";
		if (!address.phone || !/^\d{10,}$/.test(address.phone))
			newErrors.phone = "Phone number must be at least 10 digits";
		if (!address.address.trim()) newErrors.street = " Address is required";
		if (!address.city.trim()) newErrors.city = "City is required";
		if (!address.state.trim()) newErrors.state = "State is required";
		if (!address.pinCode || !/^\d{5,}$/.test(address.pinCode))
			newErrors.pinCode = "Pin Code must be at least 5 digits";
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
		} else {
			if (addressed) {
				dispatch(
					editAddress({
						addressId: addressed._id,
						addressData: address,
					})
				);
			} else {
				dispatch(addAddress(address));
			}
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-semibold text-black">
						{addressed ? "Edit Address" : "Add New Address"}
					</h2>
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={onClose}
					>
						<IoMdClose />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-4">
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Name*
							</label>
							<input
								type="text"
								name="name"
								value={address.name}
								onChange={handleChange}
								className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
									errors.name ? "border-red-500" : ""
								}`}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm">{errors.name}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Phone*
							</label>
							<input
								type="text"
								name="phone"
								value={address.phone}
								onChange={handleChange}
								className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
									errors.phone ? "border-red-500" : ""
								}`}
							/>
							{errors.phone && (
								<p className="text-red-500 text-sm">{errors.phone}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Address (House No, Building, Street, Area)*
							</label>
							<input
								type="text"
								name="address"
								value={address.address}
								onChange={handleChange}
								className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
									errors.street ? "border-red-500" : ""
								}`}
							/>
							{errors.address && (
								<p className="text-red-500 text-sm">{errors.address}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Locality*
							</label>
							<input
								type="text"
								name="locality"
								value={address.locality}
								onChange={handleChange}
								className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
									errors.locality ? "border-red-500" : ""
								}`}
							/>
							{errors.locality && (
								<p className="text-red-500 text-sm">{errors.locality}</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									City / District*
								</label>
								<input
									type="text"
									name="city"
									value={address.city}
									onChange={handleChange}
									className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
										errors.city ? "border-red-500" : ""
									}`}
								/>
								{errors.city && (
									<p className="text-red-500 text-sm">{errors.city}</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									State*
								</label>
								<input
									type="text"
									name="state"
									value={address.state}
									onChange={handleChange}
									className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
										errors.state ? "border-red-500" : ""
									}`}
								/>
								{errors.state && (
									<p className="text-red-500 text-sm">{errors.state}</p>
								)}
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Pin Code*
							</label>
							<input
								type="text"
								name="pinCode"
								value={address.pinCode}
								onChange={handleChange}
								className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-black ${
									errors.pinCode ? "border-red-500" : ""
								}`}
							/>
							{errors.pinCode && (
								<p className="text-red-500 text-sm">{errors.pinCode}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Save Address As
							</label>
							<div className="flex mt-2 space-x-4">
								<button
									type="button"
									className={`px-4 py-2 rounded-md ${
										address.typeofPlace === "Home"
											? "bg-black text-white"
											: "bg-white text-black border border-gray-300"
									}`}
									onClick={() =>
										setAddress({ ...address, typeofPlace: "Home" })
									}
								>
									Home
								</button>
								<button
									type="button"
									className={`px-4 py-2 rounded-md ${
										address.typeofPlace === "Work"
											? "bg-black text-white"
											: "bg-white text-black border border-gray-300"
									}`}
									onClick={() =>
										setAddress({ ...address, typeofPlace: "Work" })
									}
								>
									Work
								</button>
							</div>
						</div>
						<div className="mb-4 flex items-center">
							<input
								type="checkbox"
								name="isDefaultAddress"
								checked={address.isDefaultAddress}
								onChange={handleChange}
								className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
							/>
							<label className="ml-2 block text-sm text-gray-700">
								Set as default address
							</label>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full bg-black text-white py-2 rounded-md ${
								loading ? "cursor-not-allowed opacity-50" : ""
							} hover:bg-gray-600 transition duration-200`}
						>
							{loading
								? "Processing..."
								: addressed
								? "Update Address"
								: "Add Address"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddressModal;
