import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/ProductCard";
import api from "../../config/axiosConfig";
import SportsFitBanner from "../../components/user/SportsFitBanner";
import ShopNowCard from "../../components/user/ShopNowCard";

const HomePage = () => {
	const [newProducts, setNewProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");
			setNewProducts(response?.data?.products);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="container mx-auto px-2 sm:px-4">
			<div className="mb-14 md:mb-20">
				<SportsFitBanner
					image={
						"https://images.hdqwalls.com/download/neymar-jr-brazil-portraits-f1-3840x2400.jpg"
					}
				/>
			</div>
			<h1 className="text-center mb-8 font-extrabold text-4xl text-gray-900 leading-snug tracking-wider">
				<span className="font-light">Discover</span>
				<span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">
					Our Products
				</span>
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
				{newProducts?.map((product) => (
					<ProductCard key={product._id} productData={product} />
				))}
			</div>
			<ShopNowCard />

			<div className="mt-40">
				<img
					className="w-auto h-auto"
					src="../../../public/free 1.png"
					alt=""
				/>
			</div>
		</div>
	);
};

export default HomePage;
