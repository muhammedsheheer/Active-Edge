import express from "express";
import {
	registerUser,
	verifiOtp,
	resendOtp,
	userLogin,
	userVerify,
	logout,
} from "../controller/authController.js";
import { isAuth } from "../midlware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifiOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", userLogin);
router.get("/verify", isAuth, userVerify);
router.post("/logout", logout);

export default router;
