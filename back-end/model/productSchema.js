import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
			unique: true,
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
		timestamps: true,
	}
);

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

productSchema.pre("save", function (next) {
	if (this.productName) {
		this.productName = capitalizeFirstLetter(this.productName);
	}
	next();
});

const Products = mongoose.model("Products", productSchema);
export default Products;
