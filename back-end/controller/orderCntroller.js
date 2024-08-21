import Products from "../model/productSchema.js";
import Order from "../model/orderSchema.js";

const createOrder = async (req, res) => {
	const {
		userId,
		items,
		shippingAddress,
		paymentMethod,
		theTotelAmount,
		discount,
	} = req.body;
	console.log("the log body", req.body);

	try {
		for (let item of items) {
			const product = await Products.findById(item.productId);

			if (!product) {
				return res
					.status(404)
					.json({ message: `Product not found: ${item.productId}` });
			}

			const sizeIndex = product.sizes.findIndex(
				(size) => size.size === item.size
			);

			if (sizeIndex === -1) {
				return res.status(400).json({
					message: `Size ${item.size} not available for product ${product.name}`,
				});
			}

			if (product.sizes[sizeIndex].stock < item.quantity) {
				return res.status(400).json({
					message: `Insufficient stock for product ${product.productName} in size ${item.size}. Available stock: ${product.sizes[sizeIndex].stock}`,
				});
			}
		}

		const newOrder = new Order({
			userId,
			items,
			theTotelAmount,
			shippingAddress,
			paymentMethod,
			discount,
		});

		const savedOrder = await newOrder.save();

		for (let item of items) {
			const product = await Products.findById(item.productId);

			const sizeIndex = product.sizes.findIndex(
				(size) => size.size === item.size
			);

			if (sizeIndex !== -1) {
				product.sizes[sizeIndex].stock -= item.quantity;
				await product.save();
			}
		}
		console.log(savedOrder);

		return res.status(201).json({
			message: "Order confirmed successfully",
			order: savedOrder,
		});
	} catch (error) {
		console.log("Error confirming order:", error);
		res.status(500).json({ message: "Failed to confirm order" });
	}
};

const getOrderData = async (req, res) => {
	try {
		const userId = req.user.id;
		const order = await Order.find({ userId }).populate({
			path: "items.productId",
			populate: {
				path: "brand",
			},
		});

		if (!order) {
			return res.status(404).json({ message: "No orders found for this user" });
		}
		return res.status(200).json({ message: "Order get successfully", order });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllOrderData = async (req, res) => {
	try {
		const order = await Order.find().populate({
			path: "items.productId",
			populate: {
				path: "brand",
			},
		});
		return res
			.status(200)
			.json({ message: "Data fetched successfully ", order });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getOrderDetailsById = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id).populate({
			path: "items.productId",
			populate: { path: "brand" },
		});
		return res
			.status(200)
			.json({ message: "Order fetched successfully", order });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateProductStatus = async (req, res) => {
	const { id } = req.params;
	const { productId, newStatus } = req.body;

	try {
		const order = await Order.findById(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		const itemIndex = order.items.findIndex(
			(item) => item.productId.toString() === productId
		);
		if (itemIndex === -1) {
			return res.status(404).json({ message: "Product not found in order" });
		}

		order.items[itemIndex].status = newStatus;

		const statuses = order.items
			.filter((item) => item.status !== "Cancelled")
			.map((item) => item.status);

		const statusCount = statuses.reduce((count, status) => {
			count[status] = (count[status] || 0) + 1;
			return count;
		}, {});

		const highestStatus = Object.entries(statusCount).reduce(
			(max, [status, count]) => (count > max.count ? { status, count } : max),
			{ status: null, count: 0 }
		);

		if (highestStatus.status) {
			order.orderStatus = highestStatus.status;
		} else if (statuses.length === 0) {
			order.orderStatus = "Cancelled";
		}

		await order.save();

		console.log("Updated order:", order);

		return res
			.status(200)
			.json({ message: "Product status updated successfully", order });
	} catch (error) {
		console.error("Error updating product status:", error);
		return res.status(500).json({ message: "Failed to update product status" });
	}
};

const cancelOrder = async (req, res) => {
	try {
		const { orderId, itemId } = req.body;

		const order = await Order.findOneAndUpdate(
			{ "items._id": itemId },
			{ $set: { "items.$.status": "Cancelled" } },
			{ new: true }
		);

		if (order) {
			const orderItem = order.items.find(
				(item) => item._id.toString() === itemId
			);
			const { productId, quantity, size } = orderItem;

			const product = await Products.findById(productId);

			if (product) {
				const sizeIndex = product.sizes.findIndex((s) => s.size === size);

				if (sizeIndex !== -1) {
					product.sizes[sizeIndex].stock += quantity;
					await product.save();
				}
			}

			return res
				.status(200)
				.json({ message: "Order item cancelled successfully", order });
		} else {
			return res.status(404).json({ message: "Order item not found" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export {
	createOrder,
	getOrderData,
	getAllOrderData,
	getOrderDetailsById,
	updateProductStatus,
	cancelOrder,
};
