import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingOtp, setLoadingOtp] = useState(false);

	const [timer, setTimer] = useState(60);
	const [otpSent, setOtpSent] = useState(true);
	const navigate = useNavigate();

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (newPassword !== confirmPassword) {
			setMessage("Passwords do not match");
			setLoading(false);
			return;
		}
		try {
			const { data } = await api.post("/users/verify-otp-reset-password", {
				email,
				otp,
				newPassword,
				confirmPassword,
			});
			setMessage(data.message);
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
				email,
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
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
						/>
						<input
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							placeholder="Enter OTP"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
						/>
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="Enter new password"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
						/>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm new password"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
						/>
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
						>
							{loading ? "Resetting Password..." : "Reset Password"}
						</button>
						{timer > 0 && otpSent && (
							<p className="text-gray-600 text-center">
								Resend OTP in {timer} seconds
							</p>
						)}
						{!otpSent && (
							<button
								type="button"
								onClick={handleResendOtp}
								disabled={loading}
								className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
							>
								{loadingOtp ? "Sending OTP..." : "Resend OTP"}
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
