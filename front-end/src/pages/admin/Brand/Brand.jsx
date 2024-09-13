import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import Pagination from "../../../components/common/Pagination";
import AddBrandModal from "../../../components/admin/BrandModal";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Brand = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);
	const [brands, setBrands] = useState([]);
	const [openAdd, setOpenAdd] = useState(false);
	const [deleteBrand, setDeleteBrand] = useState(null);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const fetchBrands = async () => {
		try {
			const response = await api.get("/brands/getbrands");
			setBrands(response?.data?.brandData || []);
		} catch (error) {
			console.error("Error fetching brands:", error);
		}
	};

	useEffect(() => {
		fetchBrands();
	}, []);

	const handleOpenModal = () => setOpenAdd(true);
	const handleCloseModal = () => setOpenAdd(false);

	const handleDeleteBrand = (brandId) => {
		setDeleteBrand(brandId);
		setOpenDeleteModal(true);
	};

	const handleEditBrand = async () => {
		try {
		} catch (error) {}
	};

	const handleConfirmDeleteBrand = async () => {
		try {
			await api.delete(`/brands/delete-brand/${deleteBrand}`);
			setOpenDeleteModal(false);
			setDeleteBrand(null);
			fetchBrands();
		} catch (error) {
			console.log(error);
		}
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);
	console.log("the items", currentItems);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Brand Name", field: "brandName" },
		{ label: "Brand Title", field: "brandTitle" },
		{ label: "Action", field: "action" },
	];

	const tableData = currentItems.map((brand, index) => ({
		serialNo: indexOfFirstItem + index + 1,
		brandName: (
			<div className="flex items-center gap-2">
				<img
					src={brand?.logo}
					alt={brand.brandName}
					className="h-12 w-12 object-contain"
				/>
				{brand.brandName}
			</div>
		),
		brandTitle: brand.brandTitle,
		action: (
			<div className="flex space-x-2">
				<LuClipboardEdit
					className="text-green-700 cursor-pointer text-xl"
					onClick={() => handleEditBrand(brand)}
				/>
				<RiDeleteBin7Fill
					className="text-red-500 cursor-pointer text-xl"
					onClick={() => handleDeleteBrand(brand._id)}
				/>
			</div>
		),
	}));

	return (
		<>
			<div className="flex justify-between items-center px-10 py-5 mb-4">
				<div>
					<h1 className="text-2xl font-bold">Brands</h1>
					<nav className="text-gray-600 text-sm">dashboard / Brands</nav>
				</div>
				<div className="flex items-center">
					<button
						className="bg-black text-white p-2 rounded-md flex items-center"
						onClick={handleOpenModal}
					>
						<span className="mx-2">Add Brand</span>
					</button>
				</div>
			</div>
			<ReusableTable columns={columns} data={tableData} />
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(brands.length / itemsPerPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<AddBrandModal
				openAdd={openAdd}
				handleCloseModal={handleCloseModal}
				fetchBrand={fetchBrands}
			/>
			<ConfirmationModal
				open={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				message={"Are you sure about delete"}
				onConfirm={handleConfirmDeleteBrand}
			/>
		</>
	);
};

export default Brand;
