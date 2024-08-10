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

productSchema.index({ productName: 1 }, { unique: true });

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

productSchema.pre("save", async function (next) {
	if (this.productName) {
		this.productName = capitalizeFirstLetter(this.productName);
	}

	if (this.isNew || this.isModified("productName")) {
		const existingProduct = await Products.findOne({
			productName: this.productName,
		});
		if (existingProduct) {
			const error = new Error("Product with this name already exists");
			error.code = 11000;
			return next(error);
		}
	}

	next();
});

const Products = mongoose.model("Products", productSchema);
export default Products;
