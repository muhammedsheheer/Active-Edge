import React, { useState, useEffect } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/axiosConfig";
import Spinner from "../common/Spinner";

const EditProfile = () => {
	const [profileImage, setProfileImage] = useState(null);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [imageError, setImageError] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const fetchUserDetails = async () => {
		try {
			const response = await api.get("/users/getUserDetails");
			const userData = response?.data?.user;
			setName(userData.name || "");
			setPhone(userData.phone || "");
			setProfileImage(userData.dpImage || null);
		} catch (error) {
			toast.error("Failed to fetch user details");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const validImageType = ["image/png", "image/jpeg"];
			if (validImageType.includes(file.type)) {
				const reader = new FileReader();
				reader.onload = (e) => {
					setProfileImage(e.target.result);
					setImageError("");
				};
				reader.readAsDataURL(file);
			} else {
				setImageError("Please upload a PNG or JPEG file");
			}
		}
	};

	const validate = () => {
		let validationErrors = {};

		if (!name || name.includes(" ")) {
			validationErrors.name = "Name is required and cannot contain spaces";
		}

		if (!phone) {
			validationErrors.phone =
				"Phone number is required and cannot contain spaces";
		}

		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) {
			return;
		}

		setIsSaving(true);

		try {
			const response = await api.put("users/updateUserDetails", {
				name,
				phone: phone,
				dpImage: profileImage,
			});
			toast.success(response.data.message);
		} catch (error) {
			toast.error(error?.response?.data?.message);
		} finally {
			setIsSaving(false);
		}
	};

	const handleInputChange = (e, setValue) => {
		if (e.target.value.indexOf(" ") === -1) {
			setValue(e.target.value);
		}
	};

	if (loading) {
		return (
			<div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-xl">
				<Spinner />
				<div style={{ height: "500px" }}></div>
			</div>
		);
	}

	return (
		<>
			{isSaving && <Spinner />}
			<div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-xl">
				<h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
					Profile
				</h2>

				<div className="flex flex-col items-center mb-8">
					<div className="relative">
						{profileImage ? (
							<img
								src={profileImage}
								alt="Profile"
								className="w-32 h-32 rounded-full object-cover shadow-md"
							/>
						) : (
							<div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
								<FaUser className="text-gray-400 text-5xl" />
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
							onChange={handleImageChange}
							accept="image/*"
						/>
					</div>
					{imageError && <p className="text-red-500 mt-2">{imageError}</p>}
				</div>

				<div className="space-y-6">
					<div className="flex flex-col">
						<label
							htmlFor="name"
							className="text-sm font-medium text-gray-700 mb-2"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							className={`py-3 px-4 rounded-lg bg-gray-50 border ${
								errors.name ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-black`}
							placeholder="Enter your name"
							value={name}
							onChange={(e) => handleInputChange(e, setName)}
						/>
						{errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="phone"
							className="text-sm font-medium text-gray-700 mb-2"
						>
							Phone Number
						</label>
						<input
							type="tel"
							id="phone"
							className={`py-3 px-4 rounded-lg bg-gray-50 border ${
								errors.phone ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-black`}
							placeholder="Enter your phone number"
							value={phone}
							onChange={(e) => handleInputChange(e, setPhone)}
						/>
						{errors.phone && (
							<p className="text-red-500 mt-2">{errors.phone}</p>
						)}
					</div>
				</div>

				<button
					className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 shadow-lg flex justify-center items-center"
					onClick={handleSubmit}
					disabled={isSaving}
				>
					{isSaving ? <Spinner /> : "Save Changes"}
				</button>
			</div>
		</>
	);
};

export default EditProfile;
