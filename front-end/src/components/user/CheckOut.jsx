import React, { useEffect, useState } from "react";
import AddressModal from "./AddressModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, removeAddress } from "../../../redux/slices/addressSlice";
import { toast } from "react-toastify";

const CheckOut = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addresses = useSelector((state) => state.address.addresses);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedAddressId, setSelectedAddressId] = useState(null);

	useEffect(() => {
		dispatch(getAddress());
	}, [dispatch]);

	useEffect(() => {
		if (addresses.length > 0) {
			const defaultAddr = addresses.find(
				(addr) => addr.isDefaultAddress === true
			);
			setSelectedAddress(defaultAddr || null);
			setSelectedAddressId(defaultAddr ? defaultAddr._id : null);
		}
	}, [addresses]);

	const location = useLocation();
	const { totalAmount = 0, discount = 0 } = location.state || {};

	const handleEdit = (address) => {
		setSelectedAddress(address);
		setIsModalOpen(true);
	};

	const handleNew = () => {
		setSelectedAddress(null);
		setIsModalOpen(true);
	};

	const handleRemove = (addressId) => {
		dispatch(removeAddress(addressId));
	};

	const handleAddressChange = (addressId) => {
		setSelectedAddressId(addressId);
		const selectedAddr = addresses.find((addr) => addr._id === addressId);
		setSelectedAddress(selectedAddr);
	};

	const handleProceedToCheckout = () => {
		if (!selectedAddressId) {
			toast.error("Please select a delivery address.");
			return;
		}
		navigate("/payment", {
			state: {
				totalAmount,
				discount,
				selectedAddress,
			},
		});
	};

	return (
		<div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
			{/* Address Section */}
			<div className="flex-[2]">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">Select Delivery Address</h2>
				</div>
				{/* Map over addresses */}
				{addresses.map((address) => (
					<div
						key={address._id}
						className={`bg-white rounded-lg shadow p-3 mb-4 border border-gray-300 w-full text-sm ${
							selectedAddressId === address._id ? "bg-gray-100" : ""
						}`}
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center">
								<input
									type="radio"
									name="address"
									className="mr-2 accent-black"
									value={address._id}
									checked={selectedAddressId === address._id}
									onChange={() => handleAddressChange(address._id)}
								/>
								<div>
									<h3 className="font-bold text-sm">{address.name}</h3>
									<span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
										{address.typeofPlace.toUpperCase()}
									</span>
								</div>
							</div>
						</div>
						<p className="text-gray-700 mt-2 text-sm leading-tight">
							{address.address}, {address.locality}
							<br />
							{address.city}, {address.state} - {address.pinCode}
							<br />
							Mobile: <span className="font-bold">{address.phone}</span>
						</p>
						<p className="text-gray-600 mt-2 text-xs">
							• Pay on Delivery available
						</p>
						<div className="flex justify-start mt-3">
							<button
								onClick={() => handleRemove(address._id)}
								className="border border-black bg-black text-white px-3 py-1 text-xs rounded mr-2 hover:bg-black hover:text-white transition duration-150"
							>
								REMOVE
							</button>
							<button
								onClick={() => handleEdit(address)}
								className="border border-black bg-white text-black px-3 py-1 text-xs rounded hover:bg-black hover:text-white transition duration-150"
							>
								EDIT
							</button>
						</div>
					</div>
				))}

				<div className="bg-white border border-dashed border-pink-500 text-pink-500 p-3 rounded cursor-pointer w-full text-sm">
					<button onClick={handleNew}>+ Add New Address</button>
					{isModalOpen && (
						<AddressModal
							onClose={() => setIsModalOpen(false)}
							addressed={selectedAddress}
						/>
					)}
				</div>
			</div>

			{/* Cart Summary Section */}
			<div className="flex-[1] md:w-1/4 p-4 border rounded-lg bg-white shadow-sm max-h-[400px] overflow-auto">
				<h2 className="text-xl font-semibold mb-6">Price Details</h2>
				<div className="flex justify-between mb-4">
					<span className="font-medium text-gray-700">Subtotal:</span>
					<span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
				</div>
				<div className="flex justify-between mb-4">
					<span className="font-medium text-gray-700">Discount:</span>
					<span className="font-semibold">-₹{discount.toFixed(2)}</span>
				</div>
				<div className="flex justify-between mb-4">
					<span className="font-medium text-gray-700">Shipping:</span>
					<span className="font-semibold">₹30.00</span>
				</div>
				<div className="flex justify-between font-bold text-lg mb-4">
					<span>Total:</span>
					<span>₹{(totalAmount + 30 - discount).toFixed(2)}</span>
				</div>
				<button
					onClick={handleProceedToCheckout}
					className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 transition duration-200"
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default CheckOut;
