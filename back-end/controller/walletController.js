import Wallet from "../model/walletSchema.js";
// import Order from "../model/orderSchema.js";

const getWallet = async (req, res) => {
	try {
		const user = req.user.id;
		const wallet = await Wallet.findOne({ user });

		if (!wallet) return res.status(404).json({ message: "Wallet not found" });
		res.status(200).json({ message: "Wallet fetched successfully ", wallet });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createWallet = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).json({ message: "Invalid user ID" });
		}

		const existWallet = await Wallet.findOne({ user: userId });

		if (existWallet) {
			return res.status(400).json({ message: "Wallet already exists" });
		}

		const wallet = await Wallet.create({ user: userId });

		res.status(201).json({ message: "Wallet created successfully", wallet });
	} catch (error) {
		console.error("Error creating wallet:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const addMoney = async (req, res) => {
	try {
		const { amount } = req.body;

		const wallet = await Wallet.findOne({ user: req.user.id });

		if (!wallet) {
			return res.status(404).json({ message: "Wallet not found" });
		}

		wallet.balance += amount;
		wallet.transactions.push({
			type: "credit",
			amount,
			description: "Money added to wallet",
			date: Date.now(),
		});

		await wallet.save();
		res.json(wallet);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// const duductMoney = async (req, res) => {
// 	try {
// 		const { orderId } = req.body;
// 		const userId = req.user.id;

// 		const order = await Order.findById(orderId);
// 		if (!order) {
// 			return res.status(404).json({ message: "Order not found" });
// 		}
// 		const wallet = await Wallet.findOne({ user: userId });
// 		if (!wallet) {
// 			return res.status(404).json({ message: "Wallet not found" });
// 		}

// 		if (wallet.balance < order.theTotelAmount) {
// 			return res.status(400).json({ message: "Insufficient balance" });
// 		}

// 		wallet.balance -= order.theTotelAmount;
// 		wallet.transactions.push({
// 			type: "debit",
// 			amount: order.theTotelAmount,
// 			description: "Money deducted from wallet for order",
// 			date: Date.now(),
// 		});

// 		await wallet.save();
// 		await order.save();

// 		return res
// 			.status(200)
// 			.json({ message: "Payment successfull", wallet, order });
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// };

export { getWallet, createWallet, addMoney };
