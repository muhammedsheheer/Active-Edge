// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	fetchWallet,
// 	createWallet,
// 	addMoney,
// } from "../../../redux/slices/walletSlice";
// import { toast } from "react-toastify";
// import api from "../../config/axiosConfig";

// const WalletPage = () => {
// 	const dispatch = useDispatch();
// 	const { wallet, loading, error } = useSelector((state) => state.wallet);

// 	const [showModal, setShowModal] = useState(false);
// 	const [amount, setAmount] = useState("");
// 	const [user, setUser] = useState({});

// 	const fetchUserDetails = async () => {
// 		try {
// 			const response = await api.get("/users/getUserDetails");
// 			const userData = response?.data?.user;
// 			setUser(userData);
// 		} catch (error) {
// 			toast.error("Failed to fetch user details");
// 		}
// 	};

// 	useEffect(() => {
// 		fetchUserDetails();
// 	}, []);

// 	useEffect(() => {
// 		dispatch(fetchWallet());
// 	}, [dispatch]);

// 	const handleCreateWallet = () => {
// 		dispatch(createWallet());
// 	};

// 	const handleAddMoneyClick = () => {
// 		setShowModal(true);
// 	};

// 	const handleAddMoney = () => {
// 		const parsedAmount = parseFloat(amount);
// 		if (!isNaN(parsedAmount) && parsedAmount > 0) {
// 			launchRazorpay(parsedAmount);
// 			setShowModal(false);
// 			setAmount("");
// 		} else {
// 			toast.error("Please enter a valid amount");
// 		}
// 	};

// 	const launchRazorpay = (amount) => {
// 		const options = {
// 			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// 			amount: amount * 100,
// 			currency: "INR",
// 			name: user.name,
// 			description: "Add Money to Wallet",
// 			handler: async function (response) {
// 				toast.success("Payment successful");
// 				await dispatch(addMoney(amount));
// 				await dispatch(fetchWallet());
// 			},
// 			prefill: {
// 				name: user.name,
// 				email: user.email,
// 				contact: user.phone,
// 			},
// 			theme: {
// 				color: "#3399cc",
// 			},
// 		};

// 		const rzp = new window.Razorpay(options);
// 		rzp.open();

// 		rzp.on("payment.failed", function (response) {
// 			toast.error(`Payment failed: ${response.error.description}`);
// 		});
// 	};

// 	return (
// 		<div className="min-h-screen  text-white flex flex-col items-center py-10 px-4">
// 			<h1 className="text-4xl font-bold mb-8 text-black">Wallet</h1>
// 			{loading ? (
// 				<p className="text-xl">Loading...</p>
// 			) : wallet ? (
// 				<>
// 					<div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
// 						<div className="flex justify-between items-center mb-6">
// 							<h2 className="text-3xl font-semibold">
// 								Balance: ₹{wallet?.wallet?.balance?.toFixed(2)}
// 							</h2>
// 							<button
// 								onClick={handleAddMoneyClick}
// 								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// 							>
// 								Add Money
// 							</button>
// 						</div>
// 						<h3 className="text-xl font-semibold mb-4">Transaction History</h3>
// 						<div className="overflow-x-auto">
// 							<table className="min-w-full bg-gray-800 rounded-lg">
// 								<thead>
// 									<tr>
// 										<th className="text-left px-4 py-2 text-gray-400">Date</th>
// 										<th className="text-left px-4 py-2 text-gray-400">Type</th>
// 										<th className="text-left px-4 py-2 text-gray-400">
// 											Amount
// 										</th>
// 										<th className="text-left px-4 py-2 text-gray-400">
// 											Description
// 										</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{wallet?.wallet?.transactions.map((transaction, index) => (
// 										<tr key={index} className="border-t border-gray-700">
// 											<td className="px-4 py-2">
// 												{new Date(transaction.date).toLocaleString()}
// 											</td>
// 											<td className="px-4 py-2">{transaction.type}</td>
// 											<td className="px-4 py-2">₹{transaction.amount}</td>
// 											<td className="px-4 py-2">{transaction.description}</td>
// 										</tr>
// 									))}
// 								</tbody>
// 							</table>
// 						</div>
// 					</div>
// 				</>
// 			) : (
// 				<>
// 					<p className="text-xl mb-4">No wallet found. Please create one.</p>
// 					<button
// 						onClick={handleCreateWallet}
// 						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// 					>
// 						Create Wallet
// 					</button>
// 				</>
// 			)}

// 			{/* Add Money Modal */}
// 			{showModal && (
// 				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
// 					<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// 						<h2 className="text-2xl font-semibold mb-4 text-gray-800">
// 							Add Money
// 						</h2>
// 						<input
// 							type="number"
// 							placeholder="Enter amount"
// 							value={amount}
// 							onChange={(e) => setAmount(e.target.value)}
// 							className="w-full p-3 border rounded-lg mb-4 text-black"
// 						/>
// 						<div className="flex justify-end">
// 							<button
// 								onClick={() => setShowModal(false)}
// 								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
// 							>
// 								Cancel
// 							</button>
// 							<button
// 								onClick={handleAddMoney}
// 								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// 							>
// 								Add Money
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default WalletPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchWallet,
	createWallet,
	addMoney,
} from "../../../redux/slices/walletSlice";
import { toast } from "react-toastify";
import api from "../../config/axiosConfig";

const WalletPage = () => {
	const dispatch = useDispatch();
	const { wallet, loading, error } = useSelector((state) => state.wallet);

	const [showModal, setShowModal] = useState(false);
	const [amount, setAmount] = useState("");
	const [user, setUser] = useState({});

	const fetchUserDetails = async () => {
		try {
			const response = await api.get("/users/getUserDetails");
			const userData = response?.data?.user;
			setUser(userData);
		} catch (error) {
			toast.error("Failed to fetch user details");
		}
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

	useEffect(() => {
		dispatch(fetchWallet());
	}, [dispatch]);

	const handleCreateWallet = () => {
		dispatch(createWallet());
	};

	const handleAddMoneyClick = () => {
		setShowModal(true);
	};

	const handleAddMoney = () => {
		const parsedAmount = parseFloat(amount);
		if (!isNaN(parsedAmount) && parsedAmount > 0) {
			launchRazorpay(parsedAmount);
			setShowModal(false);
			setAmount("");
		} else {
			toast.error("Please enter a valid amount");
		}
	};

	const launchRazorpay = (amount) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
			amount: amount * 100,
			currency: "INR",
			name: user.name,
			description: "Add Money to Wallet",
			handler: async function (response) {
				toast.success("Payment successful");
				await dispatch(addMoney(amount));
				await dispatch(fetchWallet());
			},
			prefill: {
				name: user.name,
				email: user.email,
				contact: user.phone,
			},
			theme: {
				color: "#3399cc",
			},
		};

		const rzp = new window.Razorpay(options);
		rzp.open();

		rzp.on("payment.failed", function (response) {
			toast.error(`Payment failed: ${response.error.description}`);
		});
	};

	return (
		<div className="min-h-screen bg-gray-100 text-black flex flex-col items-center py-10 px-4">
			<h1 className="text-4xl font-sans mb-8">My Wallet</h1>

			{loading ? (
				<p className="text-xl">Loading...</p>
			) : wallet ? (
				<>
					<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mb-8">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-3xl font-bold text-gray-800">
								Balance: ₹{wallet?.wallet?.balance?.toFixed(2)}
							</h2>
							<button
								onClick={handleAddMoneyClick}
								className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-6 rounded-lg shadow"
							>
								Add Money
							</button>
						</div>

						<h3 className="text-2xl font-semibold text-gray-700 mb-4">
							Transaction History
						</h3>

						<div className="overflow-x-auto">
							<table className="min-w-full bg-white rounded-lg shadow-md">
								<thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
									<tr>
										<th className="py-3 px-6 text-left">Date</th>
										<th className="py-3 px-6 text-left">Type</th>
										<th className="py-3 px-6 text-left">Amount</th>
										<th className="py-3 px-6 text-left">Description</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm">
									{wallet?.wallet?.transactions.length > 0 ? (
										wallet.wallet.transactions.map((transaction, index) => (
											<tr
												key={index}
												className={`border-t ${
													index % 2 === 0 ? "bg-gray-50" : "bg-white"
												}`}
											>
												<td className="py-3 px-6 text-left">
													{new Date(transaction.date).toLocaleString()}
												</td>
												<td className="py-3 px-6 text-left">
													{transaction.type}
												</td>
												<td className="py-3 px-6 text-left">
													₹{transaction.amount}
												</td>
												<td className="py-3 px-6 text-left">
													{transaction.description}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan="4"
												className="py-3 px-6 text-center text-gray-500"
											>
												No transactions available
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</>
			) : (
				<>
					<p className="text-xl mb-4">No wallet found. Please create one.</p>
					<button
						onClick={handleCreateWallet}
						className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded-lg shadow"
					>
						Create Wallet
					</button>
				</>
			)}

			{/* Add Money Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">Add Money</h2>
						<input
							type="number"
							placeholder="Enter amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg mb-4"
						/>
						<div className="flex justify-end">
							<button
								onClick={() => setShowModal(false)}
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
							>
								Cancel
							</button>
							<button
								onClick={handleAddMoney}
								className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded-lg"
							>
								Add Money
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WalletPage;
