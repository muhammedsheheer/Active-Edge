import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../../components/user/Footer";
import { setUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { validateLoginForm } from "../../utils/FormValidation";
import { toast } from "react-toastify";
import api from "../../config/axiosConfig";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

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
				const res = await api.post("/users/login", formData);
				console.log("the response", res);
				const { user, isAuthenticated, role } = res?.data;
				dispatch(setUser({ user, isAuthenticated, role }));
				toast.success(res?.data?.message);
				res?.data?.role === "admin" ? navigate("/dashboard") : navigate("/");
			} catch (error) {
				toast.error("Invalid password or email");
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			try {
				const res = await api.post(
					"/users/google-login",
					{
						code: codeResponse.code,
					},
					{ withCredentials: true }
				);
				console.log("the user loger", res);

				dispatch(setUser(res.data.userData));
				toast.success(res.data.message);
				navigate(res.data.userData.role ? "/dashboard" : "/");
			} catch (err) {
				console.error(err);
				toast.error(err.response?.data?.message || "Google login failed");
			}
		},
		flow: "auth-code",
	});

	return (
		<>
			<Header />

			<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
				<div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<button
						onClick={() => login()}
						type="button"
						className="mb-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<FcGoogle className="w-5 h-5 mr-2" />
						Sign up with Google
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
								{showPassword ? <FaEyeSlash /> : <FaEye />}
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
