import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import { dark } from "@mui/material/styles/createPalette";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";
import { useLocation } from "react-router-dom";

const BestSelling = () => {
	const location = useLocation();
	const [bestSellingProduct, setBestSellingProduct] = useState([]);
	const [bestSellingCategory, setBestSellingCategory] = useState([]);
	const [bestSellingBrand, setBestSellingBrand] = useState([]);

	const fetchBestSellingProduct = async () => {
		try {
			const response = await api.get("/best-selling/top-selling-products");

			setBestSellingProduct(response?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBestSellingCategory = async () => {
		try {
			const response = await api.get("/best-selling/top-selling-category");

			setBestSellingCategory(response?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBestSellingBrand = async () => {
		try {
			const response = await api.get("/best-selling/top-selling-brand");

			setBestSellingBrand(response?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchBestSellingProduct();
		fetchBestSellingCategory();
		fetchBestSellingBrand();
	}, []);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Name", field: "name" },
		{ label: "Total Sold", field: "totalSold" },
	];

	const tableDataProduct = bestSellingProduct.map((product, index) => ({
		serialNo: index + 1,
		name: (
			<div className="flex items-center gap-2">
				<img
					src={product?._id?.thumbnail}
					alt={product?._id?.productName}
					className="h-12 w-12 object-contain"
				/>
				{product?._id?.productName}
			</div>
		),
		totalSold: product?.totalSold,
	}));

	const tableDataBrand = bestSellingBrand.map((brand, index) => ({
		serialNo: index + 1,
		name: (
			<div className="flex items-center gap-2">
				<img
					src={brand?._id?.logo}
					alt={brand?._id?.brandName}
					className="h-12 w-12 object-contain"
				/>
				{brand?._id?.brandName}
			</div>
		),
		totalSold: brand?.totalSold,
	}));

	const tableDataCategory = bestSellingCategory.map((category, index) => ({
		serialNo: index + 1,
		name: category?._id?.categoryName,
		totalSold: category?.totalSold,
	}));
	return (
		<>
			<BreadCrumbWithButton
				noButton={false}
				componentLocation={"Best Selling"}
				location={location.pathname}
			/>
			<div className="flex flex-row gap-2">
				<div>
					<h1 className="text-center">Best Selling Product</h1>
					<ReusableTable columns={columns} data={tableDataProduct} />
				</div>
				<div>
					<h1 className="text-center">Best Selling Category</h1>
					<ReusableTable columns={columns} data={tableDataCategory} />
				</div>
				<div>
					<h1 className="text-center">Best Selling Brand</h1>
					<ReusableTable columns={columns} data={tableDataBrand} />
				</div>
			</div>
		</>
	);
};

export default BestSelling;
