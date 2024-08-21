import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import {
	getCarItems,
	removeCartItem,
	updateCartItem,
} from "../../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartCard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [localCartItems, setLocalCartItems] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [couponCode, setCouponCode] = useState("");
	const [discount, setDiscount] = useState(0);
	const MAX_QUANTITY = 5;

	useEffect(() => {
		dispatch(getCarItems());
	}, [dispatch]);

	useEffect(() => {
		setLocalCartItems(cartItems?.items || []);
		calculateTotalAmount(cartItems?.items || []);
	}, [cartItems]);

	const calculateTotalAmount = (items) => {
		if (items) {
			const total = items.reduce((total, cartItem) => {
				const itemPrice = Number(cartItem?.productId?.salePrice);
				const itemTotal = itemPrice * cartItem?.quantity;
				return total + itemTotal;
			}, 0);
			setTotalAmount(total);
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

	const handleApplyCoupon = () => {
		if (couponCode === "DISCOUNT10") {
			const discountValue = totalAmount * 0.1;
			setDiscount(discountValue);
			toast.success(
				`Coupon "${couponCode}" applied! You saved ₹${discountValue.toFixed(2)}`
			);
		} else {
			alert("Invalid coupon code");
			setDiscount(0);
		}
	};

	const handleProceedToCheckout = () => {
		navigate("/checkOut", {
			state: {
				totalAmount,
				discount,
			},
		});
	};

	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-8 text-center">
				Your Shopping Cart
			</h1>

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
											₹{cartItem?.productId?.salePrice.toFixed(2)}
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
													{cartItem?.productId?.sizes?.map((size) => (
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
					<div className="p-6 border rounded-lg bg-white shadow-sm">
						<h2 className="text-xl font-semibold mb-6">Price Details</h2>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Subtotal:</span>
							<span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
						</div>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Discount:</span>
							<span className="font-semibold">- ₹{discount.toFixed(2)}</span>
						</div>
						<div className="flex justify-between mb-4">
							<span className="font-medium text-gray-700">Shipping:</span>
							<span className="font-semibold">₹30.00</span>
						</div>
						<div className="flex justify-between font-bold text-lg mb-4">
							<span>Total:</span>
							<span>₹{(totalAmount + 30 - discount).toFixed(2)}</span>
						</div>

						<div className="mt-6">
							<h3 className="text-lg font-medium mb-2">Have a coupon?</h3>
							<div className="flex items-center">
								<input
									type="text"
									className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
									placeholder="Enter coupon code"
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
								/>
								<button
									className="bg-gray-950 text-white px-3 py-2 rounded-r-md hover:bg-gray-700 transition duration-200"
									onClick={handleApplyCoupon}
								>
									Apply
								</button>
							</div>
						</div>
						<button
							className="mt-6 w-full bg-gray-950 text-white py-3 rounded-md hover:bg-gray-700 transition duration-200"
							onClick={handleProceedToCheckout}
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			) : (
				<p className="text-center text-gray-600 mt-8">Your cart is empty.</p>
			)}
		</div>
	);
};

export default CartCard;
