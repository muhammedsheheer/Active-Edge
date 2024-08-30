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
			landmark: { type: String, required: false },
			alternatePhone: { type: String, required: false },
		},
		paymentMethod: {
			type: String,
			enum: ["Cash on delivery", "Razorpay", "Wallet"],
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
		razorpayOrderId: {
			type: String,
			required: false,
		},
		transactionId: {
			type: String,
			required: false,
		},
		refundDetails: {
			refundId: { type: String, required: false },
			refundStatus: {
				type: String,
				enum: ["Pending", "Completed", "Failed"],
				default: "Pending",
			},
			refundAmount: { type: Number, required: false },
			refundDate: { type: Date, required: false },
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
