import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
