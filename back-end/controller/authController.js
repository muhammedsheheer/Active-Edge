import User from "../model/userScheema.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import Otp from "../model/otpScheema.js";
import { sendOTPByEmail } from "../utils/emailService.js";
import { generateToken } from "../utils/generateToken.js";

const registerUser = async (req, res) => {
	try {
		const { name, email, phone, password, cPassword, role } = req.body;
		if (!name || !email || !phone || !password || !cPassword) {
			return res.status(400).json({ message: "All fields required" });
		}
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		if (password !== cPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashPassword,
			phone,
			role,
			isVerified: false,
		});
		const userData = await user.save();

		const otp = otpGenerator.generate(6, {
			digits: true,
			alphabets: false,
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		console.log(`Generated OTP: ${otp}`); // Debugging: Log the generated OTP

		const otpData = new Otp({ email, otp });
		await otpData.save();
		await sendOTPByEmail(email, otp);
		return res
			.status(200)
			.json({ message: "User registration successful", userData });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const verifiOtp = async (req, res) => {
	try {
		const { otp } = req.body;
		console.log("Verifying OTP:", otp); // Debugging: Log the OTP being verified

		const otpData = await Otp.findOne({ otp });
		if (!otpData) {
			return res.status(400).json({ message: "Invalid OTP or OTP expired" });
		}

		const user = await User.findOne({ email: otpData.email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		if (user.isVerified) {
			return res.status(400).json({ message: "User already verified" });
		}

		await User.updateOne(
			{ email: otpData.email },
			{ $set: { isVerified: true } }
		);
		await Otp.deleteOne({ otp });

		return res.status(200).json({ message: "OTP verified successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const resendOtp = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email, isVerified: false });
		if (!user) {
			return res
				.status(400)
				.json({ message: "User not found or already verified" });
		}
		await Otp.deleteMany({ email });

		const otp = otpGenerator.generate(6, {
			digits: true,
			alphabets: false,
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		console.log(`Resent OTP: ${otp}`); // Debugging: Log the resent OTP

		const otpData = new Otp({ email, otp });
		await otpData.save();

		await sendOTPByEmail(email, otp);
		return res
			.status(200)
			.json({ message: "New OTP sent successfully, please check your email" });
	} catch (error) {
		return res.status(500).json({ message: "Failed to resend OTP", error });
	}
};

const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const userData = await User.findOne({
			email: email,
			isVerified: true,
		});
		if (!userData) {
			return res.status(400).json({ message: "User not found" });
		}
		const matchPassword = await bcrypt.compare(password, userData.password);
		if (!matchPassword) {
			return res.status(400).json({ message: "Invalid password" });
		}
		if (!userData.isVerified) {
			return res.status(400).json({ message: "User not verified" });
		}
		generateToken(res, userData);
		return res.status(200).json({ message: "Login successful", userData });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const userVerify = async (req, res) => {
	try {
		const userId = req.user;
		const userData = await User.findById(userId.id).select("-password");
		if (!userData) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ message: "User verified", user: userData });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const logout = async (req, res) => {
	try {
		res.cookie("jwtToken", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { registerUser, verifiOtp, resendOtp, userLogin, userVerify, logout };
