import React, { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
import api from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

const ProductsDetails = () => {
	const [product, setProduct] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		fetchProductDetails();
	}, [id]);

	const fetchProductDetails = async () => {
		try {
			const response = await api.get(`/product/productDetails/${id}`);
			if (response?.data?.productsDetails) {
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
					{/* Thumbnails */}
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
					{/* Main Image */}
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
						<span className="text-lg font-bold">${product?.regularPrice}</span>
						<span className="line-through text-gray-500">
							${product?.salePrice}
						</span>
					</div>
					<p className="mt-4 text-sm">{product?.description}</p>

					{/* Size selection */}
					<div className="flex flex-wrap gap-2 mt-2 justify-center">
						<span className="m-1 text-lg font-medium">Size:</span>
						{product?.sizes?.map((size) => (
							<div key={size._id} className="text-center">
								<button
									className="px-4 py-2 border rounded-lg focus:outline-none"
									disabled={size.stock === 0}
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

					{/* Action buttons */}
					<div className="flex justify-center mt-4 space-x-2">
						<button
							className={
								product?.status
									? "bg-black text-white px-4 py-2 text-sm"
									: "bg-gray-200 text-black px-4 py-2 text-sm cursor-not-allowed"
							}
							disabled={!product?.status}
						>
							ADD TO CART
						</button>
						<button
							className={
								product?.status
									? "border px-4 py-2 text-sm"
									: "border bg-gray-200 px-4 py-2 text-sm cursor-not-allowed"
							}
						>
							ADD TO WISHLIST
						</button>
					</div>
				</div>
			</div>
			<RelatedProduct gender={product?.gender} />
		</>
	);
};

export default ProductsDetails;
