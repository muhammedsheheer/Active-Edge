import React from "react";

const HomePage = () => {
	const bestSellingJerseys = [
		{ name: "Arsenal Jersey", price: "$89.99" },
		{ name: "Manchester United Jersey", price: "$94.99" },
		{ name: "Liverpool Jersey", price: "$89.99" },
	];

	const products = [
		{ name: "Real Madrid Jersey", price: "$89.99" },
		{ name: "Barcelona Jersey", price: "$89.99" },
		{ name: "PSG Jersey", price: "$89.99" },
		{ name: "Bayern Munich Jersey", price: "$89.99" },
		{ name: "Nike Mercurial", price: "$79.99" },
		{ name: "Adidas Predator", price: "$89.99" },
		{ name: "Puma Future", price: "$84.99" },
		{ name: "New Balance Furon", price: "$79.99" },
	];

	const featuredCategories = [
		{ name: "Football Jerseys" },
		{ name: "Training Gear" },
		{ name: "Boots" },
	];

	return (
		<div className="container mx-auto px-4">
			{/* Hero Section */}
			<div className="bg-yellow-400 text-black p-8 mb-8 rounded-lg flex flex-col md:flex-row items-center">
				<div className="md:w-1/2">
					<h1 className="text-4xl font-bold mb-4">
						Discover and Find Your Own Sports Fit!
					</h1>
					<p className="mb-4">
						Explore our extensive collection of sports gear
					</p>
					<button className="bg-black text-white px-6 py-2 rounded">
						Shop Now
					</button>
				</div>
				<div className="md:w-1/2">
					{/* Placeholder for hero image */}
					<div className="bg-gray-300 h-64 w-full rounded"></div>
				</div>
			</div>

			{/* Best Selling Men's Jersey */}
			<h2 className="text-2xl font-bold mb-4">Best Selling Men's Jersey</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{bestSellingJerseys.map((jersey, index) => (
					<div key={index} className="border p-4 rounded">
						<div className="bg-gray-200 h-48 mb-2 rounded"></div>
						<h3 className="font-semibold">{jersey.name}</h3>
						<p>{jersey.price}</p>
					</div>
				))}
			</div>
			<button className="bg-black text-white px-6 py-2 rounded mb-8">
				View All
			</button>

			{/* Our Products */}
			<h2 className="text-2xl font-bold mb-4">Our Products</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{products.map((product, index) => (
					<div key={index} className="border p-4 rounded">
						<div className="bg-gray-200 h-32 mb-2 rounded"></div>
						<h3 className="font-semibold">{product.name}</h3>
						<p>{product.price}</p>
					</div>
				))}
			</div>

			{/* Exclusive Offer */}
			<div className="bg-gray-100 p-8 mb-8 rounded-lg flex flex-col md:flex-row items-center">
				<div className="md:w-1/2 mb-4 md:mb-0">
					<h2 className="text-2xl font-bold mb-2">Exclusive offer</h2>
					<p className="mb-4">Get 20% off on the latest collection</p>
					<div className="flex space-x-2">
						<button className="bg-black text-white px-4 py-2 rounded">
							Men
						</button>
						<button className="bg-white text-black border border-black px-4 py-2 rounded">
							Women
						</button>
						<button className="bg-white text-black border border-black px-4 py-2 rounded">
							Kids
						</button>
					</div>
				</div>
				<div className="md:w-1/2">
					{/* Placeholder for offer image */}
					<div className="bg-gray-300 h-64 w-full rounded"></div>
				</div>
			</div>

			{/* Featured Category */}
			<h2 className="text-2xl font-bold mb-4">Featured Category</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{featuredCategories.map((category, index) => (
					<div key={index} className="relative">
						<div className="bg-gray-200 h-48 rounded"></div>
						<div className="absolute bottom-0 left-0 bg-white bg-opacity-75 w-full p-2">
							<h3 className="font-semibold">{category.name}</h3>
							<p>Shop Now</p>
						</div>
					</div>
				))}
			</div>

			{/* Footer Icons */}
			<div className="flex justify-around py-8 border-t">
				<div className="text-center">
					<i className="fas fa-truck text-2xl mb-2"></i>
					<p>Free Shipping</p>
				</div>
				<div className="text-center">
					<i className="fas fa-exchange-alt text-2xl mb-2"></i>
					<p>Easy Returns</p>
				</div>
				<div className="text-center">
					<i className="fas fa-lock text-2xl mb-2"></i>
					<p>Secure Payment</p>
				</div>
				<div className="text-center">
					<i className="fas fa-headset text-2xl mb-2"></i>
					<p>24/7 Support</p>
				</div>
			</div>
		</div>
	);
};

export default React.memo(HomePage);
