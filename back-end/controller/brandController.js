import Brands from "../model/brandSchema.js";
import { uploadImage } from "../utils/imageUplode.js";

const createBrand = async (req, res) => {
	try {
		const { brandName, brandTitle, logo } = req.body;
		const logoUrl = await uploadImage(logo, "mybrandImages", 200, 200, "fill");
		if (!brandName) {
			return res.status(400).json({ message: "Brand name is required" });
		}
		const existingBrand = await Brands.findOne({ brandName });
		if (existingBrand) {
			return res.status(400).json({ message: "Brand already existing" });
		}
		const brand = new Brands({
			brandName,
			brandTitle,
			logo: logoUrl,
		});
		const brandData = await brand.save();
		return res.status(200).json({ message: "Brand added successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getBrands = async (req, res) => {
	try {
		const brandData = await Brands.find();
		return res.status(200).json({ message: "Brand data fetched", brandData });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { createBrand, getBrands };
