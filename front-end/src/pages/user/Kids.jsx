import React, { useEffect, useState } from "react";
import KidsProductGrid from "../../components/user/KidsComponent";
import api from "../../config/axiosConfig";

const Kids = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");

			const data = response?.data?.products;
			console.log("the data", data);

			const Womensdata = data.filter((x) => x.gender === "Kids");
			setProducts(Womensdata);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<KidsProductGrid data={products} />
		</div>
	);
};

export default Kids;
