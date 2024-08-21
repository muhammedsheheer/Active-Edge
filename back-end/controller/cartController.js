import Cart from "../model/cartSchema.js";
import Product from "../model/productSchema.js";

const addToCart = async (req, res) => {
	try {
		console.log(req.body);
		const { productId, quantity, size } = req.body;

		const userId = req.user.id;
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		if (product.stock < quantity) {
			return res.status(400).json({ message: "Insufficent stock" });
		}
		let cart = await Cart.findOne({ user: userId });
		if (!cart) {
			cart = new Cart({
				user: userId,
				items: [{ productId, quantity, size }],
			});
		} else {
			const existingItem = cart.items.find(
				(item) => item.productId.toString() === productId && item.size === size
			);
			console.log(existingItem);
			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				cart.items.push({ productId, quantity, size });
			}
		}
		await cart.save();
		return res.status(200).json({ message: "Product added successfully" });
	} catch (error) {
		console.error(error);

		return res.status(500).json({ message: "Failed to add to cart" });
	}
};

const getToCart = async (req, res) => {
	try {
		const userId = req.user.id;

		const cart = await Cart.findOne({ user: userId }).populate({
			path: "items.productId",
			populate: { path: "brand" },
		});
		console.log("the cart", cart);

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		return res.status(200).json({ message: "Cart founded ", cart });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const removeToCart = async (req, res) => {
	try {
		const userId = req.user.id;
		const { productId } = req.params;
		const cart = await Cart.findOneAndUpdate(
			{ user: userId },
			{ $pull: { items: { productId } } }
		);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		return res
			.status(200)
			.json({ message: "Product removed successfully", cart });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateToCart = async (req, res) => {
	try {
		const { productId } = req.params;
		const { quantity, size } = req.body;
		const userId = req.user.id;
		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toHexString() === productId
		);

		if (itemIndex > -1) {
			if (size) {
				cart.items[itemIndex].size = size;
			}
			if (quantity !== undefined) {
				cart.items[itemIndex].quantity = Math.max(1, Number(quantity));
			} else {
				cart.items.push({
					productId,
					size,
					quantity: Math.max(1, Number(quantity)),
				});
			}
		}
		await cart.save();
		cart.populate({
			path: "items.productId",
			populate: { path: "brand" },
		});
		return res
			.status(200)
			.json({ message: "Product updated successfully", cart });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const clearCart = async (req, res) => {
	try {
		const userId = req.user.id;
		const cart = await Cart.findOneAndUpdate(
			{ user: userId },
			{ $set: { items: [] } },
			{ new: true }
		);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		return res.status(200).json({ message: "Cart cleared successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { addToCart, getToCart, removeToCart, updateToCart, clearCart };