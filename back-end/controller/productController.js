import Products from "../model/productSchema.js";
import { uploadImage, uploadMultipleImages } from "../utils/imageUplode.js";

const createProduct = async (req, res) => {
	try {
		const {
			productName,
			description,
			category,
			brand,
			gender,
			stock,
			regularPrice,
			salePrice,
			sizes,
			thumbnail,
			gallery,
			status,
		} = req.body;
		if (
			!productName ||
			!description ||
			!category ||
			!brand ||
			!stock ||
			!regularPrice ||
			!thumbnail ||
			!status ||
			!gender
		) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const thumbnailUrl = await uploadImage(
			thumbnail,
			"Products/thumbnil",
			550,
			550
		);
		const galleryUrl = await uploadMultipleImages(
			gallery,
			"Products/thumbnil",
			550,
			550
		);
		console.log("this is thumbnilurl", thumbnailUrl);
		console.log("this is galleryurl", galleryUrl);
		const product = new Products({
			productName,
			description,
			category,
			brand,
			gender,
			stock,
			regularPrice,
			salePrice,
			sizes,
			thumbnail: thumbnailUrl,
			gallery: galleryUrl,
			status,
		});
		const products = await product.save();
		return res.status(200).json({ message: "Product added successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await Products.find({})
			.populate("category")
			.populate("brand");
		console.log("The getProducts ", products);
		return res
			.status(200)
			.json({ message: "prodduct fetched successfully", products });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { getProducts, createProduct };
