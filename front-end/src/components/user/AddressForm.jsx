import React from "react";

const AddressForm = () => {
	return (
		<div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Delivery Address</h2>
			<form>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="md:col-span-2">
						<label className="block mb-1 font-medium text-gray-700">
							Country <span className="text-red-500">*</span>
						</label>
						<select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
							<option>Select a country</option>
							{/* Add countries here */}
						</select>
					</div>
					<div className="md:col-span-2">
						<label className="block mb-1 font-medium text-gray-700">
							Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Full Name"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block mb-1 font-medium text-gray-700">
							Address <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
							placeholder="Street address"
						/>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Apartment, suite, unit etc. (optional)"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-gray-700">
							State / Country <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Postal / Zip <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Email Address <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Phone <span className="text-red-500">*</span>
						</label>
						<input
							type="tel"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div className="mt-4">
					<label className="block mb-1 font-medium text-gray-700">
						Order Notes
					</label>
					<textarea
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						rows="3"
					></textarea>
				</div>
				<div className="mt-6 flex justify-center gap-4">
					<button
						type="submit"
						className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
					>
						Add Address
					</button>
					<button
						type="button"
						className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddressForm;
