import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Products",
		required: true,
	},
	quantity: {
		type: Number,
		default: 1,
		min: 1,
	},
	size: {
		type: String,
		required: true,
	},
	productDiscount: { type: Number },
	offerPrice: { type: Number },
	priceWithoutOffer: { type: Number },
});

const cartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
