import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const forgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email("Invalid email address")
		.required("Email is required"),
});

const ForgotPassword = () => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await api.post("/users/forgot-password", {
				email: data.email,
			});
			setMessage(response.data.message);
			navigate("/reset-password", { state: { email: data.email } });
		} catch (error) {
			setMessage(error.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10 p-4">
				<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">
						Forgot Password
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<input
								type="email"
								placeholder="Enter your email"
								{...register("email")}
								className={`w-full p-3 border ${
									errors.email ? "border-red-500" : "border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600`}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
						>
							{loading ? "Sending OTP..." : "Submit"}
						</button>
						{message && <p className="text-red-500 text-center">{message}</p>}
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ForgotPassword;
