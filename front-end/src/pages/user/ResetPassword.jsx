import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../config/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const { state } = useLocation();
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingOtp, setLoadingOtp] = useState(false);
	const [timer, setTimer] = useState(60);
	const [otpSent, setOtpSent] = useState(true);
	const navigate = useNavigate();

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Invalid email format")
			.required("Email is required"),
		otp: yup
			.string()
			.min(6, "OTP must be 6 characters")
			.required("OTP is required"),
		newPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must include both letters, numbers, and at least one special character (e.g., @, $, !, %, *, ?, &)"
			)
			.required("New password is required"),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref("newPassword"), null], "Passwords must match")
			.required("Confirm password is required"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			email: state?.email || "",
		},
	});

	useEffect(() => {
		const startTime = localStorage.getItem("otpTimerStart");
		if (startTime) {
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			if (elapsed < 60) {
				setTimer(60 - elapsed);
				setOtpSent(true);
			} else {
				setTimer(0);
				setOtpSent(false);
			}
		}
	}, []);

	useEffect(() => {
		let interval;
		if (otpSent && timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else if (timer === 0) {
			setOtpSent(false);
		}
		return () => clearInterval(interval);
	}, [timer, otpSent]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await api.post("/users/verify-otp-reset-password", {
				email: data.email.trim(),
				otp: data.otp,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
			});
			setMessage(response.data.message);
			toast.success("Password reset successfully");
			navigate("/login");
		} catch (error) {
			setMessage(error.response.data.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		setLoadingOtp(true);
		try {
			const { data } = await api.post("/users/forgot-password", {
				email: state?.email.trim(),
			});
			setMessage(data.message);
			setOtpSent(true);
			setTimer(60);
			localStorage.setItem("otpTimerStart", Date.now());
		} catch (error) {
			setMessage(error.response.data.message || "Something went wrong");
		} finally {
			setLoadingOtp(false);
		}
	};

	return (
		<>
			<Header />
			<div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10 p-4">
				<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">
						Reset Password
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div>
							<input
								type="text"
								placeholder="Enter OTP"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
								{...register("otp")}
							/>
							{errors.otp && (
								<p className="text-red-500">{errors.otp.message}</p>
							)}
						</div>

						<div>
							<input
								type="password"
								placeholder="Enter new password"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
								{...register("newPassword")}
							/>
							{errors.newPassword && (
								<p className="text-red-500">{errors.newPassword.message}</p>
							)}
						</div>

						<div>
							<input
								type="password"
								placeholder="Confirm new password"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
								{...register("confirmPassword")}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500">{errors.confirmPassword.message}</p>
							)}
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
						>
							{loading ? "Resetting..." : "Reset Password"}
						</button>

						{otpSent ? (
							<p className="text-gray-600">Resend OTP in {timer}s</p>
						) : (
							<button
								type="button"
								onClick={handleResendOtp}
								disabled={loadingOtp}
								className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
							>
								{loadingOtp ? "Resending OTP..." : "Resend OTP"}
							</button>
						)}

						{message && <p className="text-red-500 text-center">{message}</p>}
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ResetPassword;
