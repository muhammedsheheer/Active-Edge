import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/user/Header";
import api from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OTPVerification = () => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [counter, setCounter] = useState(60);
	const inputs = useRef([]);
	const navigate = useNavigate();

	useEffect(() => {
		let timer;
		if (counter > 0) {
			timer = setInterval(() => {
				setCounter((prevCounter) => prevCounter - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [counter]);

	const handleChange = (e, index) => {
		const value = e.target.value;
		if (!/^\d$/.test(value) && value !== "") return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < 5) {
			inputs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputs.current[index - 1].focus();
		}
	};

	const handlePaste = (e) => {
		const pasteData = e.clipboardData.getData("text").slice(0, 6);
		const newOtp = [...otp];
		for (let i = 0; i < pasteData.length; i++) {
			if (/^\d$/.test(pasteData[i])) {
				newOtp[i] = pasteData[i];
				if (i < 5) {
					inputs.current[i + 1].focus();
				}
			}
		}
		setOtp(newOtp);
	};

	const handleSubmit = async () => {
		const otpValue = otp.join("");
		try {
			const response = await api.post("/users/verify-otp", { otp: otpValue });
			console.log("otp respones", response);
			toast.success(response.data.message);
			if (response.status === 200) {
				navigate("/login");
				sessionStorage.removeItem("userEmail");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	const handleResendOTP = async () => {
		const userEmail = sessionStorage.getItem("userEmail");
		try {
			const response = await api.post("/users/resend-otp", {
				email: userEmail,
			});
			toast.success(response.data.message);
			setCounter(60);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<Header />
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
					<h2 className="text-2xl font-semibold text-center">
						OTP Verification
					</h2>
					<p className="text-center text-gray-600 mt-2">
						Enter the 6-digit OTP sent to your email
					</p>
					<div className="flex justify-center space-x-2 mt-4">
						{otp.map((digit, index) => {
							return (
								<input
									className="w-12 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
									key={index}
									type="text"
									value={digit}
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									maxLength="1"
									onPaste={handlePaste}
									ref={(el) => (inputs.current[index] = el)}
								/>
							);
						})}
					</div>
					<div className="flex justify-center mt-4">
						{counter > 0 ? (
							<span className="text-gray-500">
								Resend OTP in:{" "}
								<strong>00:{counter < 10 ? `0${counter}` : counter}</strong>
							</span>
						) : (
							<button
								onClick={handleResendOTP}
								className="text-blue-600 hover:underline"
							>
								Resend OTP
							</button>
						)}
					</div>
					<button
						onClick={handleSubmit}
						className="mt-6 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
					>
						Verify
					</button>
				</div>
			</div>
		</>
	);
};

export default OTPVerification;
