import React, { useEffect, useState } from "react";
import MenProductGrid from "../../components/user/MenComponent";
import api from "../../config/axiosConfig";

const Men = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");

			const data = response?.data?.products;
			console.log("the data", data);

			const Womensdata = data.filter((x) => x.gender === "Men");
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
			<MenProductGrid data={products} />
		</div>
	);
};

export default Men;
