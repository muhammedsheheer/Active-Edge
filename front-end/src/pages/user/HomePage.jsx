import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/ProductCard";
import api from "../../config/axiosConfig";
import SportsFitBanner from "../../components/user/SportsFitBanner";
import ShopNowCard from "../../components/user/ShopNowCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = () => {
	const [newProducts, setNewProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");
			setNewProducts(response?.data?.products);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="container mx-auto px-2 sm:px-4">
			<div className="mb-14 md:mb-20">
				<SportsFitBanner image={"/Home.png"} />
			</div>
			<h1 className="text-center mb-8 font-extrabold text-4xl text-gray-900 leading-snug tracking-wider">
				<span className="font-light">Discover</span>
				<span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">
					Our Products
				</span>
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
				{isLoading
					? Array(12)
							.fill(0)
							.map((_, index) => <SkeletonCard key={index} />)
					: newProducts?.map((product) => (
							<ProductCard key={product._id} productData={product} />
					  ))}
			</div>
			<ShopNowCard />

			<div className="mt-40 hidden lg:block">
				<img className="w-auto h-auto" src="/free 1.png" alt="" />
			</div>
		</div>
	);
};

const SkeletonCard = () => (
	<div className="p-4 border rounded-lg shadow-md">
		<Skeleton height={200} />
		<div className="mt-4">
			<Skeleton height={20} width={150} />
			<Skeleton height={20} width={100} className="mt-2" />
			<Skeleton height={20} width={80} className="mt-2" />
		</div>
	</div>
);

export default HomePage;
