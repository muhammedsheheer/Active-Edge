import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
	{
		categoryName: { type: String, required: true, unique: true },
		description: {
			type: String,
			required: false,
		},
		status: { type: Boolean, required: true, default: true },
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
