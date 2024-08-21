import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products",
					required: true,
				},

				quantity: { type: Number, required: true },
				size: { type: String, required: true },
				status: {
					type: String,
					enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
					default: "Pending",
				},
			},
		],
		theTotelAmount: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
			required: false,
		},
		shippingAddress: {
			name: { type: String, required: true },
			phone: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			pinCode: { type: Number, required: true },
			state: { type: String, required: true },
			typeofPlace: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			enum: ["cash", "Credit Card", "Debit Card", "UPI", "Wallet"],
			required: true,
		},
		orderStatus: {
			type: String,
			enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
			default: "Pending",
		},
		orderDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
