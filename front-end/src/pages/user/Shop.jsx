import { useLocation } from "react-router-dom";
import ShopProductGrid from "../../components/user/ShopComponet";
import api from "../../config/axiosConfig";
import { useState, useEffect } from "react";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchTerm = searchParams.get("search");

	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");
			const data = response?.data?.products || [];
			setProducts(data);
			setFilteredProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (searchTerm) {
			const filtered = products.filter((product) =>
				product.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [searchTerm, products]);

	return (
		<div>
			<ShopProductGrid data={filteredProducts} />
		</div>
	);
};

export default Shop;
