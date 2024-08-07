import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: Number,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		dpImage: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
