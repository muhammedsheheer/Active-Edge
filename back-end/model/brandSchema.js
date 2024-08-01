import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
	{
		brandName: { type: String, required: true, unique: true },
		brandTitle: { type: String, required: false },
		logo: { type: String },
	},
	{
		timesstamps: true,
	}
);

const Brands = mongoose.model("Brands", brandSchema);

export default Brands;
