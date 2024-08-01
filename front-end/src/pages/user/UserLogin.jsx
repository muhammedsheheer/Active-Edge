import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../../components/Footer";
import { setUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { validateLoginForm } from "../../utils/FormValidation";
import { toast } from "react-toastify";
import api from "../../config/axiosConfig";

const UserLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formValidate = validateLoginForm(formData);
		setErrors(formValidate);
		if (Object.keys(formValidate).length === 0) {
			try {
				const response = await api.post("users/login", formData);
				dispatch(setUser(response.data.userData));
				toast.success(response.data.message);
				response.data.userData.role === true
					? navigate("/dashboard")
					: navigate("/");
			} catch (error) {
				toast.error(error.response.data.message);
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<>
			<Header />
			<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
				<div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 flex items-center justify-center space-x-2">
						<FaGoogle />
						<span>Login with Google</span>
					</button>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email address"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>
						{errors.email && (
							<p className="text-red-500 text-sm px-2">{errors.email}</p>
						)}
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Password"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute inset-y-0 right-0 flex items-center px-2"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm px-2">{errors.password}</p>
						)}
						<div className="text-right">
							<Link
								to="/forgot-password"
								className="text-sm text-blue-500 hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
						<div>
							<button
								type="submit"
								className="w-full bg-black text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Login
							</button>
						</div>
					</form>
					<div className="text-center mt-4">
						<p className="text-sm">
							Don't have an account?{" "}
							<Link to="/register" className="text-blue-500 hover:underline">
								Register here
							</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserLogin;
