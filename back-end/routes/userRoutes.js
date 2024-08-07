import express from "express";
import {
	registerUser,
	verifiOtp,
	resendOtp,
	userLogin,
	logout,
} from "../controller/authController.js";
import { isAuth, isAuthAdmin } from "../midlware/isAuth.js";
import {
	blockUser,
	deleteUser,
	getAllUser,
	getUserDetails,
	updateUserDetails,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifiOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", userLogin);
router.post("/logout", logout);

//user routes

router.get("/getAllUser", isAuth, isAuthAdmin, getAllUser);
router.get("/getUserDetails", isAuth, getUserDetails);
router.put("/blockUser/:id", isAuth, isAuthAdmin, blockUser);
router.put("/updateUserDetails", isAuth, updateUserDetails);
router.delete("/deleteUser/:id", isAuth, isAuthAdmin, deleteUser);

export default router;
