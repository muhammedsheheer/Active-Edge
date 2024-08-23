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
