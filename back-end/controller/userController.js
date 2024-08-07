import User from "../model/userScheema.js";
import { uploadImage } from "../utils/imageUplode.js";

const getAllUser = async (req, res) => {
	try {
		const users = await User.find({ role: "user" }).select("-password");
		if (!users) {
			return res.status(400).json({ message: "User not found" });
		}
		return res.status(200).json({ message: "User fetched sucessfully", users });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUserDetails = async (req, res) => {
	try {
		const userId = req.user;
		const userData = await User.findById(userId.id).select("-password");
		if (!userData) {
			return res.status(500).json({ message: "User not found" });
		}
		return res
			.status(500)
			.json({ message: "User details fetched successfully", user: userData });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const blockUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(500).json({ message: "User not found" });
		}
		user.isVerified = !user.isVerified;
		await user.save();
		const message = user.isVerified ? "activated" : "blocked";
		return res
			.status(200)
			.json({ message: `User ${message} successfully`, user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json({ message: "Deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateUserDetails = async (req, res) => {
	try {
		const userId = req.user;
		const { name, phone, dpImage } = req.body;
		const user = await User.findById(userId.id);
		if (!user) {
			return res.status(400).json({ message: "User not founded" });
		}
		user.name = name || user.name;
		user.phone = phone || user.phone;
		if (dpImage) {
			user.dpImage = await uploadImage(dpImage, "profileImage", 600, 600);
		}
		const updateUser = await user.save();
		return res
			.status(200)
			.json({ message: "Updated successfully", user: updateUser });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { getAllUser, getUserDetails, blockUser, deleteUser, updateUserDetails };
