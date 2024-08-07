// import React, { useEffect, useState } from "react";
// import api from "../../config/axiosConfig";

// const RelatedProduct = ({ gender }) => {
// 	const [relatedProducts, setRelatedProducts] = useState([]);

// 	useEffect(() => {
// 		const fetchRelatedProducts = async () => {
// 			try {
// 				const response = await api.get(`/product/productByGender-query`, {
// 					params: { gender },
// 				});
// 				if (response?.data?.products) {
// 					setRelatedProducts(response.data.products);
// 				} else {
// 					console.error("Related products not found in response:", response);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching related products:", error);
// 			}
// 		};

// 		if (gender) {
// 			fetchRelatedProducts();
// 		}
// 	}, [gender]);

// 	return (
// 		<div className="mt-8">
// 			<h2 className="text-2xl font-bold mb-4">Related Products</h2>
// 			<div className="flex flex-wrap gap-4">
// 				{relatedProducts.length ? (
// 					relatedProducts.map((product) => (
// 						<div key={product._id} className="border p-4 rounded-lg">
// 							<img
// 								src={product.gallery[0]}
// 								alt={product.productName}
// 								className="w-full h-40 object-cover"
// 							/>
// 							<h3 className="text-lg font-semibold mt-2">
// 								{product.productName}
// 							</h3>
// 							<p className="text-gray-500">${product.regularPrice}</p>
// 						</div>
// 					))
// 				) : (
// 					<p>No related products found.</p>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default RelatedProduct;

import React, { useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import RelatedProductCard from "./RelatedProductCard";

const RelatedProduct = ({ gender }) => {
	const [relatedProducts, setRelatedProducts] = useState([]);

	useEffect(() => {
		const fetchRelatedProducts = async () => {
			try {
				const response = await api.get(`/product/productByGender-query`, {
					params: { gender },
				});
				if (response?.data?.products) {
					setRelatedProducts(response.data.products);
				} else {
					console.error("Related products not found in response:", response);
				}
			} catch (error) {
				console.error("Error fetching related products:", error);
			}
		};

		if (gender) {
			fetchRelatedProducts();
		}
	}, [gender]);

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4">Related Products</h2>
			<div className="flex flex-wrap gap-4">
				{relatedProducts.length ? (
					relatedProducts.map((product) => (
						<RelatedProductCard key={product._id} product={product} />
					))
				) : (
					<p>No related products found.</p>
				)}
			</div>
		</div>
	);
};

export default RelatedProduct;
