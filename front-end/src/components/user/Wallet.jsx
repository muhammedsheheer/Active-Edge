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
		<div className="min-h-screen bg-gray-100 text-black flex flex-col items-center py-1 px-1 sm:py-4 sm:px-4">
			<h1 className="text-sm sm:text-2xl font-sans mb-1 sm:mb-4">My Wallet</h1>

			{loading ? (
				<p className="text-xs sm:text-lg">Loading...</p>
			) : wallet ? (
				<>
					<div className="bg-white p-2 sm:p-4 rounded-lg shadow-md w-full max-w-full sm:max-w-xl mb-2 sm:mb-6">
						<div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
							<h2 className="text-sm sm:text-xl font-bold text-gray-800">
								Balance: ₹{wallet?.wallet?.balance?.toFixed(2)}
							</h2>
							<button
								onClick={handleAddMoneyClick}
								className="bg-gray-800 hover:bg-black text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg shadow mt-2 sm:mt-0 text-xs sm:text-sm"
							>
								Add Money
							</button>
						</div>

						<h3 className="text-xs sm:text-base font-semibold text-gray-700 mb-1 sm:mb-3">
							Transaction History
						</h3>

						<div className="overflow-x-auto">
							<table className="min-w-full bg-white rounded-lg shadow-md text-xs">
								<thead className="bg-gray-100 text-gray-600 uppercase text-xxs sm:text-sm leading-normal">
									<tr>
										<th className="py-1 px-1 sm:px-2 text-left">Date</th>
										<th className="py-1 px-1 sm:px-2 text-left">Type</th>
										<th className="py-1 px-1 sm:px-2 text-left">Amount</th>
										<th className="py-1 px-1 sm:px-2 text-left">Description</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-xxs sm:text-sm">
									{wallet?.wallet?.transactions.length > 0 ? (
										wallet.wallet.transactions.map((transaction, index) => (
											<tr
												key={index}
												className={`border-t ${
													index % 2 === 0 ? "bg-gray-50" : "bg-white"
												}`}
											>
												<td className="py-1 px-1 sm:px-2 text-left">
													{new Date(transaction.date).toLocaleString()}
												</td>
												<td className="py-1 px-1 sm:px-2 text-left">
													{transaction.type}
												</td>
												<td className="py-1 px-1 sm:px-2 text-left">
													₹{transaction.amount}
												</td>
												<td className="py-1 px-1 sm:px-2 text-left">
													{transaction.description}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan="4"
												className="py-1 px-1 sm:px-2 text-center text-gray-500"
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
					<p className="text-xs sm:text-lg mb-1">
						No wallet found. Please create one.
					</p>
					<button
						onClick={handleCreateWallet}
						className="bg-gray-800 hover:bg-black text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg shadow text-xs sm:text-sm"
					>
						Create Wallet
					</button>
				</>
			)}

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg w-11/12 sm:max-w-md max-w-sm">
						<h2 className="text-sm sm:text-xl font-bold mb-2">Add Money</h2>
						<input
							type="number"
							placeholder="Enter amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full p-1 sm:p-2 border border-gray-300 rounded-lg mb-2 text-xs sm:text-base"
						/>
						<div className="flex justify-end">
							<button
								onClick={() => setShowModal(false)}
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg mr-2 text-xs sm:text-sm"
							>
								Cancel
							</button>
							<button
								onClick={handleAddMoney}
								className="bg-gray-800 hover:bg-black text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm"
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
