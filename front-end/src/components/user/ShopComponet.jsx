import React, { useEffect, useState } from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import SportsFitBanner from "./SportsFitBanner";

const ShopProductGrid = ({ data }) => {
	const [listData, setListData] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
	const [sortOption, setSortOption] = useState("Recommended");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6; // Number of products per page
	const totalPages = Math.ceil(listData.length / itemsPerPage);

	const navigate = useNavigate();

	const handleProductDetails = (productId) => {
		navigate(`/productDetials/${productId}`);
	};

	useEffect(() => {
		if (data && data.length > 0) {
			setListData([...data]);
		}
	}, [data]);

	useEffect(() => {
		let filteredData = [...data];

		if (selectedBrands.length > 0) {
			filteredData = filteredData.filter((product) =>
				selectedBrands.includes(product?.brand?.brandName)
			);
		}

		if (selectedPriceRanges.length > 0) {
			filteredData = filteredData.filter((product) =>
				selectedPriceRanges.some(
					(range) =>
						product.regularPrice >= range.start &&
						product.regularPrice <= range.end
				)
			);
		}

		switch (sortOption) {
			case "LowToHigh":
				filteredData.sort((a, b) => a.regularPrice - b.regularPrice);
				break;
			case "HighToLow":
				filteredData.sort((a, b) => b.regularPrice - a.regularPrice);
				break;
			case "NewArrivals":
				filteredData.sort(
					(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
				);
				break;
			case "AZ":
				filteredData.sort((a, b) => a.productName.localeCompare(b.productName));
				break;
			case "ZA":
				filteredData.sort((a, b) => b.productName.localeCompare(a.productName));
				break;
			default:
				break;
		}

		setListData(filteredData);
	}, [selectedBrands, selectedPriceRanges, sortOption, data]);

	const handleCheckBrand = (brand, checked) => {
		if (checked) {
			setSelectedBrands((prev) => [...prev, brand]);
		} else {
			setSelectedBrands((prev) =>
				prev.filter((selectedBrand) => selectedBrand !== brand)
			);
		}
	};

	const handleCheckPrice = (startPrice, endPrice, checked) => {
		if (checked) {
			setSelectedPriceRanges((prev) => [
				...prev,
				{ start: startPrice, end: endPrice },
			]);
		} else {
			setSelectedPriceRanges((prev) =>
				prev.filter(
					(range) => range.start !== startPrice || range.end !== endPrice
				)
			);
		}
	};

	// Pagination logic
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = listData.slice(startIndex, endIndex);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			<div className="mb-16">
				<SportsFitBanner image={"/Shop.png"} />
			</div>
			<div className="flex flex-col md:flex-row">
				{/* Filter Section */}
				<div className="w-full md:w-1/4 bg-white p-6 shadow-lg rounded-lg">
					<h2 className="text-lg font-semibold mb-6 border-b pb-2">Filters</h2>
					<div className="mb-6">
						<h3 className="font-semibold mb-4">Brand</h3>
						<div className="space-y-2">
							{["Nike", "Adidas", "Puma", "Nivia"].map((brand) => (
								<label key={brand} className="flex items-center space-x-2">
									<input
										type="checkbox"
										className="form-checkbox"
										onChange={(e) => handleCheckBrand(brand, e.target.checked)}
									/>
									<span className="text-gray-700">{brand}</span>
								</label>
							))}
						</div>
					</div>
					<div className="mb-6">
						<h3 className="font-semibold mb-4">Price Range</h3>
						<div className="space-y-2">
							{[
								{ range: "₹1000 to ₹4000", start: 1000, end: 4000 },
								{ range: "₹4000 to ₹8000", start: 4000, end: 8000 },
								{ range: "₹8000 to ₹12000", start: 8000, end: 12000 },
								{ range: "₹12000 to ₹16000", start: 12000, end: 16000 },
								{ range: "₹16000 to ₹20000", start: 16000, end: 20000 },
								{ range: "₹20000 to ₹24000", start: 20000, end: 24000 },
								{ range: "₹24000 to ₹28000", start: 24000, end: 28000 },
							].map(({ range, start, end }) => (
								<label key={range} className="flex items-center space-x-2">
									<input
										type="checkbox"
										className="form-checkbox"
										onChange={(e) =>
											handleCheckPrice(start, end, e.target.checked)
										}
									/>
									<span className="text-gray-700">{range}</span>
								</label>
							))}
						</div>
					</div>
				</div>

				{/* Product Grid */}
				<div className="w-full md:w-3/4 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-semibold">Products</h2>
						<select
							className="border border-gray-300 p-2 rounded-md"
							onChange={(e) => setSortOption(e.target.value)}
						>
							<option value="Recommended">Sort by: Recommended</option>
							<option value="LowToHigh">Price: Low to High</option>
							<option value="HighToLow">Price: High to Low</option>
							<option value="NewArrivals">New Arrivals</option>
							<option value="AZ">A-Z</option>
							<option value="ZA">Z-A</option>
						</select>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
						{currentItems.map((product, index) => (
							<div key={index}>
								<div
									className="bg-white rounded-lg p-4 flex flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 transform hover:scale-105"
									onClick={() => handleProductDetails(product._id)}
								>
									<div className="w-full h-44 sm:h-52 flex items-center justify-center overflow-hidden mb-4">
										<img
											className="w-full h-full object-contain"
											src={product.thumbnail}
											alt={product.productName}
										/>
									</div>
									<div className="text-center mb-2">
										<span className="text-md sm:text-lg font-semibold">
											{product.productName}
										</span>
									</div>
									<div className="text-center mb-2 flex justify-center items-center gap-2">
										<p
											className={`text-gray-500 font-semibold ${
												product?.discountedPrice ? "line-through" : ""
											}`}
										>
											₹ {product?.salePrice}
										</p>
										{product?.discountedPrice && (
											<p className="text-red-600 font-semibold">
												({product?.offerPercentage}% OFF)
											</p>
										)}
									</div>
									<div className="text-center">
										<p className="text-red-600 font-semibold text-lg sm:text-xl">
											₹ {product?.regularPrice}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination Buttons */}
					<div className="mt-6 flex justify-center">
						<button
							className={`px-4 py-2 border rounded ${
								currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
							}`}
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
						>
							Previous
						</button>
						<span className="mx-4">
							Page {currentPage} of {totalPages}
						</span>
						<button
							className={`px-4 py-2 border rounded ${
								currentPage === totalPages
									? "bg-gray-300"
									: "bg-blue-500 text-white"
							}`}
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShopProductGrid;
