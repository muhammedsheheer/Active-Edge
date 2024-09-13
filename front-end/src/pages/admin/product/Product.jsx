import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axiosConfig";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { LuClipboardEdit } from "react-icons/lu";
import { MdBlock } from "react-icons/md";
import ReusableTable from "../../../components/admin/ReusableTableData";
import BlockModal from "../../../components/admin/BlockModal";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/admin/BreadCrumbWithButton";
import Pagination from "../../../components/common/Pagination";

const Product = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [itemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const { state } = location;
	const [getProducts, setGetProducts] = useState([]);
	const [openBlockModal, setOpenBlockModal] = useState(false);
	const [productToBlock, setProductToBlock] = useState(null);
	const [blockButtonName, setBlockButtonName] = useState("");
	const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(false);
	const [deleteProduct, setDeleteProduct] = useState(null);

	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");
			console.log(response);
			setGetProducts(response?.data?.products);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Product Name", field: "productname" },
		{ label: "Category", field: "category" },
		{ label: "SizeStock", field: "sizeStock" },
		{ label: "Price", field: "price" },
		{ label: "Status", field: "status" },
		{ label: "Action", field: "action" },
	];

	const handleBlockProductStatus = (productId) => {
		const product = getProducts.find((product) => product._id === productId);
		setOpenBlockModal(true);
		setProductToBlock(productId);
		setBlockButtonName(product.status ? "Block" : "Unblock");
	};

	const confirmationBlocking = async () => {
		try {
			const response = await api.put(
				`/product/productActivate/${productToBlock}`
			);
			const updatedProduct = response?.data?.product;
			setGetProducts((prevProduct) =>
				prevProduct.map((product) =>
					product._id === productToBlock
						? { ...product, status: updatedProduct.status }
						: product
				)
			);

			setProductToBlock(null);
			setOpenBlockModal(false);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleEditProduct = (productId) => {
		navigate(`/dashboard/editproduct/${productId}`);
	};

	const handleDeleteProduct = (productId) => {
		setDeleteProduct(productId);
		setConfirmDeleteProduct(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await api.delete(`/product/productDelete/${deleteProduct}`);
			setGetProducts((prevProduct) =>
				prevProduct.filter((product) => product._id !== deleteProduct)
			);
			setConfirmDeleteProduct(false);
			setDeleteProduct(null);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = getProducts.slice(indexOfFirstItem, indexOfLastItem);

	const productData = currentProducts?.map((product, index) => ({
		serialNo: index + 1 + (currentPage - 1) * itemsPerPage,
		productname: (
			<div className="flex items-center gap-2">
				<img
					src={product?.thumbnail}
					alt={product.productName}
					className="h-12 w-12 object-contain"
				/>
				{product.productName}
			</div>
		),
		category: product?.category?.categoryName,
		productID: product?._id,
		sizeStock: product?.sizes?.map((sizeObj) => {
			return (
				<div key={sizeObj.size} className="mt-2">
					<span className="bg-gray-900 rounded-md py-1 px-2 text-white">
						{sizeObj.size}
					</span>{" "}
					: <span>{sizeObj.stock}</span>
				</div>
			);
		}),
		price: product?.salePrice,
		status: (
			<div
				className={`text-center rounded-md py-1 px-2 font-semibold ${
					product?.status
						? "bg-green-100 text-green-500"
						: "bg-red-100 text-red-600"
				}`}
			>
				{product.status ? "Active" : "Inactive"}
			</div>
		),
		action: (
			<div className="flex space-x-2">
				<LuClipboardEdit
					className="text-green-700 cursor-pointer text-xl"
					onClick={() => handleEditProduct(product._id)}
				/>
				<RiDeleteBin7Fill
					className="text-red-500 cursor-pointer text-xl"
					onClick={() => handleDeleteProduct(product._id)}
				/>
				<div>
					<button
						onClick={() => handleBlockProductStatus(product._id)}
						className={`py-1 px-2 text-white font-semibold rounded ${
							product.status ? "bg-green-500" : "bg-red-500"
						}`}
					>
						<MdBlock />
					</button>
				</div>
			</div>
		),
	}));

	return (
		<>
			<BreadCrumb
				componentLocation={"Products"}
				buttonName={"Add Product"}
				noButton={true}
				location={location.pathname}
				buttonNavigate={"/dashboard/addNewProduct"}
			/>
			<div>
				<ReusableTable columns={columns} data={productData} />
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(getProducts.length / itemsPerPage)}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
			<BlockModal
				open={openBlockModal}
				onClose={() => setOpenBlockModal(false)}
				message={`Are you sure you want to ${blockButtonName.toLowerCase()} this item?`}
				buttonName={blockButtonName}
				onConfirm={confirmationBlocking}
			/>
			<ConfirmationModal
				open={confirmDeleteProduct}
				onClose={() => setConfirmDeleteProduct(false)}
				message={"Are you sure you want to delete this item?"}
				onConfirm={handleConfirmDelete}
			/>
		</>
	);
};

export default Product;
