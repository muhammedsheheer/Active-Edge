import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaLock,
	FaEye,
	FaEyeSlash,
} from "react-icons/fa";
import Header from "../../components/user/Header";
import { validateRegisterForm } from "../../utils/FormValidation";
import api from "../../config/axiosConfig";
import { toast } from "react-toastify";

const UserRegister = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		cPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validate = validateRegisterForm(formData);
		setErrors(validate);
		if (Object.keys(validate).length === 0) {
			try {
				const response = await api.post("/users/register", formData);
				toast.success(response?.data?.message);
				if (response.status === 200) {
					sessionStorage.setItem("userEmail", formData.email);
					navigate("/otp");
				}
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const toggleCPasswordVisibility = () => {
		setShowCPassword((prev) => !prev);
	};

	return (
		<>
			<Header />

			<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 mt-10">
				<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-2 text-center">
						Let's Get Started!
					</h2>
					<p className="text-center mb-6 text-gray-600">
						Create a GradeCheck account to get all features
					</p>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="flex items-center border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
							<FaUser className="text-blue-400 mr-2" />
							<input
								type="text"
								placeholder="Name"
								name="name"
								value={formData.name}
								className="w-full focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						{errors.name && (
							<p className="text-red-500 text-sm px-2">{errors.name}</p>
						)}
						<div className="flex items-center border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
							<FaEnvelope className="text-gray-400 mr-2" />
							<input
								type="email"
								placeholder="Email"
								name="email"
								value={formData.email}
								className="w-full focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						{errors.email && (
							<p className="text-red-500 text-sm px-2">{errors.email}</p>
						)}
						<div className="flex items-center border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
							<FaPhone className="text-gray-400 mr-2" />
							<input
								type="tel"
								placeholder="Phone"
								name="phone"
								value={formData.phone}
								className="w-full focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						{errors.phone && (
							<p className="text-red-500 text-sm px-2">{errors.phone}</p>
						)}
						<div className="relative flex items-center border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
							<FaLock className="text-gray-400 mr-2" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								name="password"
								value={formData.password}
								className="w-full focus:outline-none"
								onChange={handleChange}
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute inset-y-0 right-0 flex items-center px-2"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm px-2">{errors.password}</p>
						)}
						<div className="relative flex items-center border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
							<FaLock className="text-gray-400 mr-2" />
							<input
								type={showCPassword ? "text" : "password"}
								placeholder="Confirm Password"
								name="cPassword"
								value={formData.cPassword}
								onChange={handleChange}
								className="w-full focus:outline-none"
							/>
							<button
								type="button"
								onClick={toggleCPasswordVisibility}
								className="absolute inset-y-0 right-0 flex items-center px-2"
							>
								{showCPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						{errors.cPassword && (
							<p className="text-red-500 text-sm px-2">{errors.cPassword}</p>
						)}
						<div>
							<button
								type="submit"
								className="w-full bg-black text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Create
							</button>
						</div>
					</form>
					<div className="text-center mt-4">
						<p className="text-sm">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 hover:underline">
								Login here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserRegister;
