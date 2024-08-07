// import React from "react";
// import { PiLineVerticalThin } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ productData }) => {
// 	const navigate = useNavigate();
// 	const handleProductDetails = () => {
// 		navigate(`/productDetials/${productData._id}`);
// 	};
// 	return (
// 		<div
// 			className=" bg-white rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer"
// 			onClick={handleProductDetails}
// 		>
// 			<div>
// 				<img className="w-52 h-52 " src={productData.thumbnail} alt="" />
// 			</div>
// 			<div>
// 				<span className="text-center">{productData.productName}</span>
// 			</div>
// 			<div className="flex items-center gap-1">
// 				<span className="text-md ">${productData.salePrice}</span>
// 				<PiLineVerticalThin />
// 				<span className="text-yellow-400 text-sm">4.7</span>
// 				<svg
// 					className="w-4 h-4 text-yellow-400"
// 					fill="currentColor"
// 					viewBox="0 0 20 20"
// 				>
// 					<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
// 				</svg>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductCard;

import React from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productData }) => {
	const navigate = useNavigate();

	const handleProductDetails = () => {
		navigate(`/productDetials/${productData._id}`);
	};

	return (
		<div
			className="bg-white rounded-sm p-4 flex flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6"
			onClick={handleProductDetails}
		>
			<div className="w-full h-52 flex items-center justify-center overflow-hidden mb-4">
				<img
					className="w-52 h-52 object-contain"
					src={productData.thumbnail}
					alt={productData.productName}
				/>
			</div>
			<div className="text-center mb-2">
				<span className="text-lg font-semibold">{productData.productName}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-md font-medium">${productData.salePrice}</span>
				<PiLineVerticalThin className="text-gray-400" />
				<span className="text-yellow-400 text-sm font-medium">4.7</span>
				<svg
					className="w-4 h-4 text-yellow-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
				</svg>
			</div>
		</div>
	);
};

export default ProductCard;
