import React, { useEffect, useState } from "react";
import { FaStar, FaWallet } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsCashStack, BsCreditCard2Back } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
import BankOffer from "./BankOffer";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCarItems } from "../../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const generateCaptcha = () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let captcha = "";
	for (let i = 0; i < 6; i++) {
		captcha += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return captcha;
};

const PaymentOptions = () => {
	const userId = useSelector((state) => state.auth.user);

	const items = useSelector((state) => state.cart.cartItems.items);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { totalAmount, discount, selectedAddress } = location.state || {};
	const theTotelAmount = totalAmount + 30 - discount;

	useEffect(() => {
		dispatch(getCarItems());
	}, [dispatch]);

	const createOrder = async (orderData) => {
		try {
			const response = await api.post("/order/create-order", orderData);
			return response.data;
		} catch (error) {
			console.error("Error creating order:", error);
			throw error;
		}
	};

	const handleCashOnDelivery = async (paymentMethod) => {
		if (captchaInput !== captcha) {
			alert("Invalid captcha. Please try again.");
			return;
		}

		try {
			const orderData = {
				userId,
				items,
				shippingAddress: selectedAddress,
				paymentMethod,
				theTotelAmount,
				discount,
			};

			const orderResponse = await createOrder(orderData);
			console.log("order response", orderResponse);

			if (orderResponse) {
				dispatch(clearCart());

				navigate("/confirmation", {
					state: { orderDetails: orderResponse.data },
				});
			} else {
				toast.error("Order creation failed. Please try again.");
			}
		} catch (error) {
			console.error("Failed to create order:", error);
			alert("Failed to create order. Please try again.");
		}
	};

	const handleRazorpay = async (paymentMethod) => {
		const orderData = {
			userId,
			items,
			shippingAddress: selectedAddress,
			paymentMethod,
			theTotelAmount,
			discount,
		};

		const orderResponse = await createOrder(orderData);

		if (orderResponse) {
			console.log("the order response ", orderResponse);

			const options = {
				key: "rzp_test_vwN611UYiUDrfk",
				amount: theTotelAmount * 100,
				currency: "INR",
				name: "Active Edge",
				description: "Order Payment",
				order_id: orderResponse.order.razorpayOrderId,
				handler: function (response) {
					dispatch(clearCart());
					navigate("/confirmation", {
						state: { orderDetails: orderResponse.data },
					});
				},
				prefill: {
					name: orderResponse?.order?.shippingAddress?.name,
					email: "email@example.com",
					contact: orderResponse?.order?.shippingAddress?.phone,
				},
				theme: {
					color: "#3399cc",
				},
			};
			const rzp = new window.Razorpay(options);
			rzp.open();
		} else {
			toast.error("Order creation failed. Please try again.");
		}
	};

	const [selectedOption, setSelectedOption] = useState("recommended");
	const [openCashOnDel, setOpenCashOnDel] = useState(false);
	const [openRazorPay, setOpenRazorPay] = useState(false);
	const [openWallet, setOpenWallet] = useState(false);

	const [captcha, setCaptcha] = useState(generateCaptcha());
	const [captchaInput, setCaptchaInput] = useState("");

	const handleCaptchaInputChange = (e) => {
		setCaptchaInput(e.target.value);
	};

	const options = [
		{ id: "recommended", label: "Recommended", icon: <FaStar /> },
		{
			id: "cash",
			label: "Cash On Delivery",
			icon: <BsCashStack />,
		},
		{ id: "razorpay", label: "Razorpay", icon: <MdPayment /> },
		{ id: "wallet", label: "Wallets", icon: <FaWallet /> },
	];

	const renderContent = () => {
		switch (selectedOption) {
			case "recommended":
				return (
					<div className="flex items-center space-x-2 text-black">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<input
									type="radio"
									id="cod"
									name="payment"
									className="form-radio"
									onClick={() => {
										setOpenCashOnDel(!openCashOnDel);
										setCaptcha(generateCaptcha());
									}}
								/>
								<label htmlFor="cod">Cash on Delivery</label>
								<BsCashStack className="ml-auto" />
							</div>
							{openCashOnDel && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex items-center justify-center gap-2">
										<span
											className="font-bold italic text-2xl text-pink-600 border-b-2 border-pink-600"
											style={{ userSelect: "none", pointerEvents: "none" }}
										>
											{captcha}
										</span>
										<button
											onClick={() => setCaptcha(generateCaptcha())}
											className="text-gray-600 underline"
										>
											<IoMdRefresh />
										</button>
									</div>
									<input
										type="text"
										placeholder="Enter captcha"
										className="outline-none px-2 py-2 border w-full"
										value={captchaInput}
										onChange={handleCaptchaInputChange}
									/>
									<button
										onClick={() => handleCashOnDelivery("Cash on delivery")}
										className="px-3 py-2 bg-pink-700 text-white font-semibold text-lg"
									>
										Confirm Order
									</button>
								</div>
							)}
						</div>
					</div>
				);
			case "cash":
				return (
					<div className="flex items-center space-x-2 text-black">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<input
									type="radio"
									id="cod"
									name="payment"
									className="form-radio"
									onClick={() => {
										setOpenCashOnDel(!openCashOnDel);
										setCaptcha(generateCaptcha());
									}}
								/>
								<label htmlFor="cod">Cash on Delivery</label>
								<BsCashStack className="ml-auto" />
							</div>
							{openCashOnDel && (
								<div className="w-full flex flex-col gap-4">
									<div className="flex items-center justify-center gap-2">
										<span
											className="font-bold italic text-2xl text-pink-600 border-b-2 border-pink-600"
											style={{ userSelect: "none", pointerEvents: "none" }}
										>
											{captcha}
										</span>
										<button
											onClick={() => setCaptcha(generateCaptcha())}
											className="text-gray-600 underline"
										>
											<IoMdRefresh />
										</button>
									</div>
									<input
										type="text"
										placeholder="Enter captcha"
										className="outline-none px-2 py-2 border w-full"
										value={captchaInput}
										onChange={handleCaptchaInputChange}
									/>
									<button
										onClick={() => handleCashOnDelivery("Cash on delivery")}
										className="px-3 py-2 bg-pink-700 text-white font-semibold text-lg"
									>
										Confirm Order
									</button>
								</div>
							)}
						</div>
					</div>
				);
			case "razorpay":
				return (
					<div className="flex items-center space-x-2 text-black">
						<div className="flex flex-col gap-3">
							<div className="flex items-center space-x-2 text-black">
								<input
									type="radio"
									id="razorpay"
									name="payment"
									className="form-radio"
									onClick={() => {
										setOpenRazorPay(!openRazorPay);
									}}
								/>
								<label htmlFor="razorpay">Razorpay </label>
								<MdPayment className="ml-auto" />
							</div>

							{openRazorPay && (
								<div className="w-full flex flex-col gap-4 mt-8">
									<button
										onClick={() => handleRazorpay("Razorpay")}
										className="px-3 py-2 bg-pink-700 text-white font-semibold text-lg"
									>
										Pay Now
									</button>
								</div>
							)}
						</div>
					</div>
				);
			case "wallet":
				return (
					<div className="flex items-center space-x-2">
						<input
							type="radio"
							id="wallet"
							name="payment"
							className="form-radio"
						/>
						<label htmlFor="wallet">Wallets</label>
						<FaWallet className="ml-auto" />
					</div>
				);
			default:
				return <p>Select a payment option</p>;
		}
	};

	return (
		<>
			<BankOffer />
			<div className="flex flex-col lg:flex-row overflow-hidden">
				<div className="lg:w-1/3 bg-gray-100">
					<ul>
						{options.map((option) => (
							<li
								key={option.id}
								className={`p-4 flex items-center cursor-pointer hover:bg-gray-200 ${
									selectedOption === option.id
										? "border-l-4 border-pink-600 text-pink-600 bg-white"
										: ""
								}`}
								onClick={() => setSelectedOption(option.id)}
							>
								<span
									className={`mr-3 ${
										selectedOption === option.id ? "text-pink-600" : ""
									}`}
								>
									{option.icon}
								</span>
								<span
									className={`${
										selectedOption === option.id ? "text-pink-600" : ""
									}`}
								>
									{option.label}
								</span>
								{option.offers && (
									<span className="ml-auto text-xs text-green-600">
										{option.offers}
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className="lg:w-2/3">
					<h2 className="text-xl font-semibold px-10 py-3">
						{selectedOption === "recommended"
							? "Recommended Payment Options"
							: "Payment Option"}
					</h2>
					<div className="px-10 py-3">{renderContent()}</div>
				</div>
				<div className="lg:w-1/4 p-4 border rounded-lg bg-white shadow-sm max-h-[400px] overflow-auto">
					<h2 className="text-xl font-semibold mb-6">Price Details</h2>
					<div className="flex justify-between mb-4">
						<span className="font-medium text-gray-700">Subtotal:</span>
						<span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-4">
						<span className="font-medium text-gray-700">Discount:</span>
						<span className="font-semibold"> ₹{discount.toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-4">
						<span className="font-medium text-gray-700">Shipping:</span>
						<span className="font-semibold">₹{(30.0).toFixed(2)}</span>
					</div>
					<hr className="my-4" />
					<div className="flex justify-between mb-4">
						<span className="font-semibold text-lg text-gray-800">Total:</span>
						<span className="font-semibold text-lg text-pink-600">
							₹{theTotelAmount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default PaymentOptions;

// import React, { useEffect, useState } from "react";
// import { FaStar, FaWallet } from "react-icons/fa";
// import { MdPayment } from "react-icons/md";
// import { BsCashStack, BsCreditCard2Back } from "react-icons/bs";
// import { IoMdRefresh } from "react-icons/io";
// import BankOffer from "./BankOffer";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../../config/axiosConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, getCarItems } from "../../../redux/slices/cartSlice";
// import { toast } from "react-toastify";

// const generateCaptcha = () => {
// 	const characters =
// 		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 	let captcha = "";
// 	for (let i = 0; i < 6; i++) {
// 		captcha += characters.charAt(Math.floor(Math.random() * characters.length));
// 	}
// 	return captcha;
// };

// const PaymentOptions = () => {
// 	const userId = useSelector((state) => state.auth.user);
// 	const items = useSelector((state) => state.cart.cartItems.items);
// 	const location = useLocation();
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const { totalAmount, discount, selectedAddress } = location.state || {};
// 	const theTotelAmount = totalAmount + 30 - discount;

// 	useEffect(() => {
// 		dispatch(getCarItems());
// 	}, [dispatch]);

// 	const createOrder = async (orderData) => {
// 		try {
// 			const response = await api.post("/order/create-order", orderData);
// 			return response.data;
// 		} catch (error) {
// 			console.error("Error creating order:", error);
// 			throw error;
// 		}
// 	};

// const handlePayment = async (paymentMethod) => {
// 	const orderData = {
// 		userId,
// 		items,
// 		shippingAddress: selectedAddress,
// 		paymentMethod,
// 		theTotelAmount,
// 		discount,
// 	};

// 	const orderResponse = await createOrder(orderData);

// 	if (orderResponse) {
// 		console.log("the order response ", orderResponse);

// 		const options = {
// 			key: "rzp_test_vwN611UYiUDrfk",
// 			amount: theTotelAmount * 100,
// 			currency: "INR",
// 			name: "Active Edge",
// 			description: "Order Payment",
// 			order_id: orderResponse.order.razorpayOrderId,
// 			handler: function (response) {
// 				dispatch(clearCart());
// 				navigate("/confirmation", {
// 					state: { orderDetails: orderResponse.data },
// 				});
// 			},
// 			prefill: {
// 				name: orderResponse?.order?.shippingAddress?.name,
// 				email: "email@example.com",
// 				contact: orderResponse?.order?.shippingAddress?.phone,
// 			},
// 			theme: {
// 				color: "#3399cc",
// 			},
// 		};
// 		const rzp = new window.Razorpay(options);
// 		rzp.open();
// 	} else {
// 		toast.error("Order creation failed. Please try again.");
// 	}
// };

// 	const handleCashOnDelivery = async () => {
// 		if (captchaInput !== captcha) {
// 			alert("Invalid captcha. Please try again.");
// 			return;
// 		}

// 		try {
// 			await handlePayment("cash");
// 		} catch (error) {
// 			console.error("Failed to create order:", error);
// 			alert("Failed to create order. Please try again.");
// 		}
// 	};

// 	const [selectedOption, setSelectedOption] = useState("recommended");
// 	const [openCashOnDel, setOpenCashOnDel] = useState(false);
// 	const [captcha, setCaptcha] = useState(generateCaptcha());
// 	const [isCaptchaValid, setIsCaptchaValid] = useState(false);
// 	const [captchaInput, setCaptchaInput] = useState("");

// 	const handleCaptchaInputChange = (e) => {
// 		setCaptchaInput(e.target.value);
// 	};

// 	const options = [
// 		{ id: "recommended", label: "Recommended", icon: <FaStar /> },
// 		{ id: "cash", label: "Cash On Delivery", icon: <BsCashStack /> },
// 		{ id: "upi", label: "UPI (Pay via any App)", icon: <MdPayment /> },
// 		{ id: "card", label: "Credit/Debit Card", icon: <BsCreditCard2Back /> },
// 		{ id: "wallet", label: "Wallets", icon: <FaWallet /> },
// 	];

// 	const renderContent = () => {
// 		switch (selectedOption) {
// 			case "recommended":
// 				return (
// 					<div className="flex flex-col space-y-4 text-black">
// 						<div className="flex items-center space-x-2">
// 							<input
// 								type="radio"
// 								id="cod"
// 								name="payment"
// 								className="form-radio"
// 							/>
// 							<label htmlFor="cod">Cash on Delivery (Cash/UPI)</label>
// 							<BsCashStack className="ml-auto" />
// 						</div>
// 					</div>
// 				);
// 			case "cash":
// 				return (
// 					<div className="flex items-center space-x-2 text-black">
// 						<div className="flex flex-col gap-3">
// 							<div className="flex items-center gap-3">
// 								<input
// 									type="radio"
// 									id="cod"
// 									name="payment"
// 									className="form-radio"
// 									onClick={() => {
// 										setOpenCashOnDel(!openCashOnDel);
// 										setCaptcha(generateCaptcha());
// 									}}
// 								/>
// 								<label htmlFor="cod">Cash on Delivery</label>
// 								<BsCashStack className="ml-auto" />
// 							</div>
// 							{openCashOnDel && (
// 								<div className="w-full flex flex-col gap-4">
// 									<div className="flex items-center justify-center gap-2">
// 										<span
// 											className="font-bold italic text-2xl text-pink-600 border-b-2 border-pink-600"
// 											style={{ userSelect: "none", pointerEvents: "none" }}
// 										>
// 											{captcha}
// 										</span>
// 										<button
// 											onClick={() => setCaptcha(generateCaptcha())}
// 											className="text-gray-600 underline"
// 										>
// 											<IoMdRefresh />
// 										</button>
// 									</div>
// 									<input
// 										type="text"
// 										placeholder="Enter captcha"
// 										className="outline-none px-2 py-2 border w-full"
// 										value={captchaInput}
// 										onChange={handleCaptchaInputChange}
// 									/>
// 									<button
// 										onClick={handleCashOnDelivery}
// 										className="px-3 py-2 bg-pink-700 text-white font-semibold text-lg"
// 									>
// 										Confirm Order
// 									</button>
// 								</div>
// 							)}
// 						</div>
// 					</div>
// 				);
// 			case "upi":
// 				return (
// 					<div className="flex items-center space-x-2 text-black">
// 						<input
// 							type="radio"
// 							id="upi"
// 							name="payment"
// 							className="form-radio"
// 							onClick={() => handlePayment("upi")}
// 						/>
// 						<label htmlFor="upi">UPI (Pay via any App)</label>
// 						<MdPayment className="ml-auto" />
// 					</div>
// 				);
// 			case "card":
// 				return (
// 					<div className="flex items-center space-x-2">
// 						<input
// 							type="radio"
// 							id="card"
// 							name="payment"
// 							className="form-radio"
// 							onClick={() => handlePayment("card")}
// 						/>
// 						<label htmlFor="card">Credit/Debit Card</label>
// 						<BsCreditCard2Back className="ml-auto" />
// 					</div>
// 				);
// 			case "wallet":
// 				return (
// 					<div className="flex items-center space-x-2">
// 						<input
// 							type="radio"
// 							id="wallet"
// 							name="payment"
// 							className="form-radio"
// 							onClick={() => handlePayment("wallet")}
// 						/>
// 						<label htmlFor="wallet">Wallets</label>
// 						<FaWallet className="ml-auto" />
// 					</div>
// 				);
// 			default:
// 				return <p>Select a payment option</p>;
// 		}
// 	};

// 	return (
// 		<>
// 			<BankOffer />
// 			<div className="flex flex-col lg:flex-row overflow-hidden">
// 				<div className="lg:w-1/3 bg-gray-100">
// 					<ul>
// 						{options.map((option) => (
// 							<li
// 								key={option.id}
// 								className={`p-4 flex items-center cursor-pointer hover:bg-gray-200 ${
// 									selectedOption === option.id
// 										? "border-l-4 border-pink-600 text-pink-600"
// 										: ""
// 								}`}
// 								onClick={() => setSelectedOption(option.id)}
// 							>
// 								{option.icon}
// 								<span className="ml-3 text-lg font-semibold">
// 									{option.label}
// 								</span>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 				<div className="lg:w-2/3 p-4">{renderContent()}</div>
// 			</div>
// 		</>
// 	);
// };

// export default PaymentOptions;
