import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import {
	getCarItems,
	removeCartItem,
	updateCartItem,
} from "../../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../config/axiosConfig";
import CouponModal from "./CoupenModal";

const CartCard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [localCartItems, setLocalCartItems] = useState([]);
	const [coupons, setCoupons] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [discountedAmount, setDiscountedAmount] = useState(0);
	const [appliedCoupon, setAppliedCoupon] = useState(null);
	const MAX_QUANTITY = 5;

	const [showCouponModal, setShowCouponModal] = useState(false);

	const fetchCoupons = async () => {
		try {
			const response = await api.get("/coupen/get-coupen");
			setCoupons(response.data.coupens);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCoupons();
	}, []);

	useEffect(() => {
		dispatch(getCarItems());
	}, [dispatch]);

	useEffect(() => {
		setLocalCartItems(cartItems?.items || []);
		calculateTotalAmount(cartItems?.items || []);
	}, [cartItems]);

	const calculateTotalAmount = (items) => {
		if (items) {
			let totalDiscountedAmount = 0;

			const total = items.reduce((total, cartItem) => {
				const itemPrice = cartItem.originalPrice * cartItem.quantity;
				let discountAmount = 0;

				if (cartItem?.discountedPrice) {
					discountAmount =
						(cartItem.originalPrice - cartItem.discountedPrice) *
						cartItem.quantity;
					totalDiscountedAmount += discountAmount;
				}

				const itemTotal = itemPrice;
				return total + itemTotal;
			}, 0);

			setTotalAmount(total);
			setDiscountedAmount(totalDiscountedAmount);
		}
	};

	const handleRemoveCartItem = (productId) => {
		dispatch(removeCartItem(productId)).then(() => {
			const updatedItems = localCartItems.filter(
				(item) => item.productId._id !== productId
			);
			setLocalCartItems(updatedItems);
			calculateTotalAmount(updatedItems);
		});
	};

	const handleSizeChange = (cartItem, newSize) => {
		dispatch(
			updateCartItem({
				productId: cartItem.productId._id,
				size: newSize,
				quantity: cartItem.quantity,
			})
		).then(() => {
			const updatedItems = localCartItems.map((item) =>
				item.productId._id === cartItem.productId._id
					? { ...item, size: newSize }
					: item
			);
			setLocalCartItems(updatedItems);
			calculateTotalAmount(updatedItems);
		});
	};

	const handleQtyChange = (cartItem, newQty) => {
		dispatch(
			updateCartItem({
				productId: cartItem.productId._id,
				size: cartItem.size,
				quantity: newQty,
			})
		).then(() => {
			const updatedItems = localCartItems.map((item) =>
				item.productId._id === cartItem.productId._id
					? { ...item, quantity: newQty }
					: item
			);
			setLocalCartItems(updatedItems);
			calculateTotalAmount(updatedItems);
		});
	};

	const removeCoupon = async (coupon) => {
		try {
			const response = await api.post("/coupen/remove-coupen", {
				code: coupon.code,
			});
			toast.info("Coupon removed successfully!");
		} catch (error) {
			console.log(error);
		}
	};
	const handleSelectCoupon = (coupon) => {
		if (appliedCoupon?.code === coupon.code) {
			setAppliedCoupon(null);
			setDiscount(0);
			removeCoupon(coupon);
		} else {
			setAppliedCoupon(coupon);
			applyCoupon(coupon);
		}
	};

	const applyCoupon = async (coupon) => {
		try {
			const response = await api.post("/coupen/validate-coupen", {
				code: coupon.code,
				purchaseAmount: totalAmount,
			});
			const { discountAmount, message } = response.data;
			setDiscount(discountAmount);
			toast.success(`${message}! You saved ₹${discountAmount.toFixed(2)}`);
		} catch (error) {
			toast.error(error.response.data.message || "Invalid coupon code");
			setDiscount(0);
		}
	};

	const handleProceedToCheckout = () => {
		navigate("/checkOut", {
			state: {
				totalAmount,
				discount,
				appliedCoupon,
				discountedAmount,
			},
		});
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	const handleShopNow = () => {
		navigate("/shop");
	};

	return (
		<div className="container mx-auto px-4">
			{localCartItems.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						{localCartItems.map((cartItem) => {
							const availableQty = Array.from(
								{
									length: Math.min(
										cartItem.productId.sizes.find(
											(size) => size.size === cartItem.size
										).stock,
										MAX_QUANTITY
									),
								},
								(_, i) => i + 1
							);

							return (
								<div
									key={cartItem._id}
									className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg mb-4"
								>
									{/* Product Image */}
									<div className="w-20 h-20">
										<img
											src={cartItem?.productId?.thumbnail}
											alt="Product"
											className="w-full h-full object-cover rounded-md"
										/>
									</div>

									{/* Product Details */}
									<div className="flex-1 ml-4">
										<h2 className="text-lg font-semibold">
											{cartItem?.productId?.productName}
										</h2>
										<p className="text-gray-500">
											{cartItem?.discountedPrice
												? `₹${cartItem?.discountedPrice.toFixed(2)}`
												: `₹${cartItem?.productId?.salePrice.toFixed(2)}`}
										</p>

										<div className="flex items-center gap-4 mt-2">
											<div className="flex items-center gap-2">
												<label className="text-sm font-medium">Size:</label>
												<select
													className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
													value={cartItem.size}
													onChange={(e) =>
														handleSizeChange(cartItem, e.target.value)
													}
												>
													{cartItem?.productId?.sizes
														?.filter((s) => s?.stock !== 0)
														.map((size) => (
															<option key={size._id} value={size.size}>
																{size.size}
															</option>
														))}
												</select>
											</div>

											<div className="flex items-center gap-2">
												<label className="text-sm font-medium">Qty:</label>
												<select
													className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
													value={cartItem.quantity}
													onChange={(e) =>
														handleQtyChange(cartItem, Number(e.target.value))
													}
												>
													{availableQty.map((quantity) => (
														<option key={quantity} value={quantity}>
															{quantity}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									{/* Remove Button */}
									<div className="flex items-center">
										<button
											className="text-red-600 hover:text-red-800"
											onClick={() =>
												handleRemoveCartItem(cartItem.productId._id)
											}
										>
											<MdDeleteForever size={24} />
										</button>
									</div>
								</div>
							);
						})}
					</div>

					{/* Cart Summary and Coupon */}
					<div className=" p-6 border rounded-lg bg-white shadow-sm">
						<div className="flex flex-col sm:flex-row items-center justify-between border-b mb-8 p-4">
							<div className="flex items-center mb-4 sm:mb-0 ">
								<FaTag className="text-lg text-black mr-2" />
								<span className="font-medium text-gray-800">
									{" "}
									{appliedCoupon ? "Coupon Applied" : "Apply Coupons"}
								</span>
							</div>

							<button
								onClick={() => setShowCouponModal(true)}
								className=" font-medium text-xs py-1 px-3 rounded-sm border-2 border-red-400 text-red-500 hover:bg-red-100 transition duration-300"
							>
								{appliedCoupon ? "Edit" : "Apply"}
							</button>
						</div>
						<div className="text-sm text-green-600 mb-4">
							{appliedCoupon
								? `You saved additional₹${discount.toFixed(2)} `
								: ""}
						</div>

						<h2 className="text-xl font-semibold mb-6">Price Details</h2>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Subtotal :</span>
							<span className="font-semibold">₹{totalAmount}</span>
						</div>
						{appliedCoupon && (
							<div className="flex justify-between mb-4">
								<span className="font-medium text-gray-700">
									Coupen Discount :
								</span>
								<span className="font-semibold text-green-600">
									-₹{discount}
								</span>
							</div>
						)}
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">
								Discount on MRP :
							</span>
							<span
								className={
									discountedAmount > 0
										? "font-semibold text-green-600"
										: "font-semibold text-black"
								}
							>
								-₹{discountedAmount}
							</span>
						</div>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Shipping :</span>
							<span className="font-semibold">₹30</span>
						</div>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Total:</span>
							<span className="font-semibold">
								₹{totalAmount + 30 - discount - discountedAmount}
							</span>
						</div>
						<button
							className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition duration-300"
							onClick={handleProceedToCheckout}
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center  bg-white px-4">
					<h2 className="text-lg font-bold text-gray-800 mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-500 text-center mb-6">
						Just relax, let us help you find some first-class products.
					</p>
					<img
						src={"/EmptycartImage.png"}
						alt="Empty Wishlist"
						className="w-96 h-56 mb-6"
					/>
					<button
						onClick={handleShopNow}
						className="border-2 border-black bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-200"
					>
						CONTINUE SHOPPING
					</button>
				</div>
			)}

			{/* Coupon Modal */}
			{showCouponModal && (
				<CouponModal
					coupons={coupons}
					onSelectCoupon={handleSelectCoupon}
					closeModal={() => setShowCouponModal(false)}
					appliedCoupon={appliedCoupon}
					purchaseAmount={totalAmount}
				/>
			)}
		</div>
	);
};

export default CartCard;
