import React, { useState } from "react";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await api.post("/users/forgot-password", { email });
			setMessage(data.message);
			// Store the start time in localStorage when OTP is sent
			localStorage.setItem("otpTimerStart", Date.now());
			navigate("/reset-password");
		} catch (error) {
			setMessage(error.response.data.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="flex justify-center items-center min-h-screen  p-4">
				<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">
						Forgot Password
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
						/>
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
						>
							{loading ? "Sending OTP..." : "Send OTP"}
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
