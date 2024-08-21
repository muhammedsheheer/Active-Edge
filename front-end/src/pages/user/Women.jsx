import React, { useEffect, useState } from "react";
import ProductGrid from "../../components/user/WomenComponent";
import api from "../../config/axiosConfig";

const Women = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");

			const data = response?.data?.products;
			// .filter((x) => x.gender === "Men")
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<ProductGrid data={products} />
		</div>
	);
};

export default Women;
