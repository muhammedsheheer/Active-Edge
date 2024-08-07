import React from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const RelatedProductCard = ({ product }) => {
	const navigate = useNavigate();

	const handleProductDetails = () => {
		navigate(`/productDetials/${product._id}`);
	};

	return (
		<div
			className="bg-white rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
			onClick={handleProductDetails}
		>
			<div className="mb-2">
				<img
					className="w-52 h-52 object-cover rounded-lg"
					src={product.thumbnail}
					alt={product.productName}
				/>
			</div>
			<div className="text-center mb-2">
				<h3 className="text-lg font-semibold">{product.productName}</h3>
				<p className="text-gray-500">{product.gender}</p>
			</div>
			<div className="flex items-center gap-1 mb-2">
				<span className="text-md font-bold text-gray-800">
					${product.salePrice}
				</span>
				<PiLineVerticalThin />
				<span className="text-yellow-400 text-sm">
					{product.rating || "N/A"}
				</span>
				<svg
					className="w-4 h-4 text-yellow-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
				</svg>
			</div>
			<div className="flex items-center gap-1">
				<span className="text-sm text-gray-500">
					Size: {product.size || "N/A"}
				</span>
			</div>
		</div>
	);
};

export default RelatedProductCard;
