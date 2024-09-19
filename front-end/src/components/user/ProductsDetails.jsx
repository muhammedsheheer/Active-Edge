import React, { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
import api from "../../config/axiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import {
	handleWishlist,
	getWishlist,
} from "../../../redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import { addCartItems, getCarItems } from "../../../redux/slices/cartSlice";

const ProductsDetails = () => {
	const wishlist = useSelector((state) => state.wishlist.products) || [];
	const cartItems = useSelector((state) => state.cart.cartItems);
	const { user } = useSelector((state) => state.auth);
	const userId = user;
	const [product, setProduct] = useState(null);
	const [datas, setDatas] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const [loading, setLoading] = useState(true);
	const [selectSize, setSelectSize] = useState(null);
	const [isInCart, setIsInCart] = useState(
		cartItems.items?.some((item) => item.productId._id === product?._id) ||
			false
	);

	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const checkIsInCart = () => {
		return cartItems.items?.some((item) => item.productId._id === product?._id);
	};

	useEffect(() => {
		if (product && cartItems.items) {
			setIsInCart(checkIsInCart());
		}
	}, [product, cartItems]);

	const handleAddToCart = async () => {
		if (!selectSize) {
			setError("Please select size");
			return;
		}
		setError("");
		try {
			if (user) {
				dispatch(
					addCartItems({
						productId: product._id,
						size: selectSize,
					})
				);
				toast.success("Added to cart successfully");
				setIsInCart(!isInCart);
			} else {
				navigate("/login");
				window.scrollTo({ top: 0, behavior: "instant" });
			}
		} catch (error) {
			console.log(error);
			toast.error("Faild to add");
		}
	};

	useEffect(() => {
		if (user) {
			dispatch(getCarItems());
		}
	}, [dispatch]);

	useEffect(() => {
		fetchProductDetails();
	}, [id]);

	useEffect(() => {
		dispatch(getWishlist(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		if (product) {
			setIsInWishlist(wishlist.some((item) => item._id === product._id));
		}
	}, [wishlist, product]);

	const [isInWishlist, setIsInWishlist] = useState(false);

	const handleWish = () => {
		if (!userId) {
			toast.error("Please log in to add items to your wishlist.");
			navigate("/login");
			return;
		}

		dispatch(handleWishlist({ userId, productId: product._id })).then(() => {
			setIsInWishlist(!isInWishlist);
		});
	};

	const fetchProductDetails = async () => {
		try {
			const response = await api.get(`/product/productDetails/${id}`);

			if (response?.data?.productsDetails) {
				setDatas(response.data);
				setProduct(response.data.productsDetails);
				setMainImage(response.data.productsDetails?.gallery[0]);
				setLoading(false);
			} else {
				console.error("Product details not found in response:", response);
			}
		} catch (error) {
			console.error("Error fetching product details:", error);
			setLoading(false);
		}
	};

	const handleThumbnailClick = (imageSrc) => {
		setMainImage(imageSrc);
	};

	return (
		<>
			<div className="mb-8">
				<h2 className="text-2xl font-bold">Product Details</h2>
				<span className="text-gray-600 font-semibold">
					Home / Product Details / {product?.gender}
				</span>
			</div>
			<div className="container mx-auto p-4 max-w-screen-lg">
				<div className="flex flex-col md:flex-row md:space-x-4">
					<div className="flex flex-wrap md:flex-col md:space-y-2 space-x-2 md:space-x-0">
						{product?.gallery.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`Thumbnail ${index + 1}`}
								className="w-32 h-36 object-cover cursor-pointer border-2 border-transparent hover:border-gray-300"
								onClick={() => handleThumbnailClick(image)}
							/>
						))}
					</div>
					<div className="md:w-3/4 flex justify-center items-center mt-4 md:mt-0">
						<div>
							{loading ? (
								<p>Loading...</p>
							) : (
								<Magnifier
									src={mainImage}
									alt="Main"
									className="w-full h-80 object-contain"
									zoomFactor={1}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="text-center mt-4">
					<h1 className="text-xl font-bold">{product?.productName}</h1>
					<p className="text-gray-500">5k Reviews</p>
					<div className="flex justify-center items-center space-x-2 mt-2">
						<span className="text-lg font-bold">
							₹
							{datas?.discountedPrice
								? datas?.discountedPrice
								: product?.salePrice}
						</span>
						{datas?.discountedPrice && (
							<span className="line-through text-gray-500">
								₹{product?.salePrice}
							</span>
						)}
					</div>
					<p className="mt-4 text-sm">{product?.description}</p>

					<div className="flex flex-wrap gap-2 mt-2 justify-center">
						<span className="m-1 text-lg font-medium">Size:</span>
						{product?.sizes?.map((size) => (
							<div key={size._id} className="text-center">
								<button
									key={size}
									className={`px-4 py-2 border rounded-lg focus:outline-none ${
										selectSize === size.size ? "bg-black text-white" : " "
									}`}
									disabled={size.stock === 0}
									onClick={() => setSelectSize(size.size)}
								>
									{size?.size}
								</button>
								<p
									className={`text-sm mt-1 ${
										size.stock === 0 || size.stock === 1
											? "text-red-500"
											: "text-green-700"
									}`}
								>
									{size.stock > 0 ? `${size.stock} left` : "Out of stock"}
								</p>
							</div>
						))}
					</div>
					<div className="text-red-600">{error}</div>
					<div className="mt-4 flex items-center justify-center gap-4">
						<h1 className="font-semibold text-xl text-gray-600">
							Availability :
						</h1>
						<p
							className={`text-xl font-semibold ${
								product?.status ? "text-green-800" : "text-red-600"
							}`}
						>
							{product?.status ? "Available" : "Unavailable"}
						</p>
					</div>

					<div className="flex justify-center mt-4 space-x-2">
						{!isInCart ? (
							<button
								className={
									product?.status
										? "bg-black text-white px-4 py-2 text-sm"
										: "bg-gray-200 text-black px-4 py-2 text-sm cursor-not-allowed"
								}
								disabled={!product?.status}
								onClick={handleAddToCart}
							>
								ADD TO CART
							</button>
						) : (
							<Link to="/cart">
								<button
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									className={
										product?.status
											? "bg-black text-white px-4 py-2 text-sm"
											: "bg-gray-200 text-black px-4 py-2 text-sm cursor-not-allowed"
									}
									disabled={!product?.status}
								>
									GO TO CART
								</button>
							</Link>
						)}

						<button
							className={
								isInWishlist
									? "border border-red-500 px-4 py-2 text-sm text-red-500"
									: "border px-4 py-2 text-sm"
							}
							onClick={handleWish}
						>
							{isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
						</button>
					</div>
				</div>
			</div>
			<RelatedProduct gender={product?.gender} />
		</>
	);
};

export default ProductsDetails;
