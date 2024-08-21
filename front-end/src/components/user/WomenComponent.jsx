import React, { useEffect, useState } from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ data }) => {
	console.log("the data is", data);

	const [listData, setListData] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
	const [sortOption, setSortOption] = useState("Recommended");

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

		// Filter by brand
		if (selectedBrands.length > 0) {
			filteredData = filteredData.filter((product) =>
				selectedBrands.includes(product?.brand?.brandName)
			);
		}

		// Filter by price range
		if (selectedPriceRanges.length > 0) {
			filteredData = filteredData.filter((product) =>
				selectedPriceRanges.some(
					(range) =>
						product.regularPrice >= range.start &&
						product.regularPrice <= range.end
				)
			);
		}

		// Apply sorting
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

	return (
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
							{ range: "$30 to $70", start: 30, end: 70 },
							{ range: "$70 to $110", start: 70, end: 110 },
							{ range: "$110 to $150", start: 110, end: 150 },
							{ range: "$150 to $190", start: 150, end: 190 },
							{ range: "$190 to $230", start: 190, end: 230 },
							{ range: "$230 to $270", start: 230, end: 270 },
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
					{listData.map((product, index) => (
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
								<div className="flex items-center gap-2">
									<span className="text-sm sm:text-md font-medium">
										${product.regularPrice}
									</span>
									<PiLineVerticalThin className="text-gray-400" />
									<span className="text-yellow-400 text-xs sm:text-sm font-medium">
										4.7
									</span>
									<svg
										className="w-4 h-4 text-yellow-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
									</svg>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductGrid;
