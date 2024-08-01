import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brands",
			required: true,
		},
		gender: {
			type: String,
			enum: ["Men", "Women", "Kids"],
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		regularPrice: {
			type: Number,
			required: true,
		},
		salePrice: {
			type: Number,
		},
		sizes: [
			{
				size: String,
				stock: Number,
			},
		],
		thumbnail: {
			type: String,
			required: true,
		},
		gallery: [
			{
				type: String,
			},
		],
		status: {
			type: Boolean,
			default: true,
		},
	},
	{
		timesstamps: true,
	}
);

const Products = mongoose.model("Products", productSchema);
export default Products;
