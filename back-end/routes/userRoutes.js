import express from "express";
import {
	registerUser,
	verifiOtp,
	resendOtp,
	userLogin,
	logout,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifiOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", userLogin);
router.post("/logout", logout);

export default router;
