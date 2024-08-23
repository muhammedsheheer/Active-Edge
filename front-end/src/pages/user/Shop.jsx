import React, { useEffect, useState } from "react";
import ShopProductGrid from "../../components/user/ShopComponet";
import api from "../../config/axiosConfig";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");

			const data = response?.data?.products;

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
			<ShopProductGrid data={products} />
		</div>
	);
};

export default Shop;
