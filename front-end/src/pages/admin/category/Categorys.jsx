import React, { useEffect, useState } from "react";
import {
	deleteCategoryItem,
	editCategoryItem,
	getCategoryItems,
} from "../../../../redux/slices/categorySlice";
import { MdBlock } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "../../../components/admin/ReusableTableData";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/admin/CategoryForm";

const Category = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.category.categories);
	const [deleteCategory, setDeleteCategory] = useState(null);
	const [confirmDeleteCategory, setConfirmDeleteCategory] = useState(false);
	const [editCategory, setEditCategory] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		dispatch(getCategoryItems());
	}, [dispatch]);

	const handleOpen = () => {
		setOpen(true);
		setEditCategory(null);
	};

	const handleClose = () => {
		setOpen(false);
		setEditCategory(null);
	};

	const handleEditCategory = (category) => {
		setEditCategory(category);
		setOpen(true);
	};

	const handleCategoryAdded = () => {
		dispatch(getCategoryItems());
	};

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Category Name", field: "categoryName" },
		{ label: "Description", field: "description" },
		{ label: "Created At", field: "createdAt" },
		{ label: "Status", field: "status" },
		{ label: "Action", field: "action" },
	];

	const handleDeleteCategory = (id) => {
		setDeleteCategory(id);
		setConfirmDeleteCategory(true);
	};

	const handleDeleteConfirmation = () => {
		dispatch(deleteCategoryItem(deleteCategory));
		setConfirmDeleteCategory(false);
		setDeleteCategory(null);
	};

	const handleStatus = async (category) => {
		try {
			await dispatch(
				editCategoryItem({
					...category,
					status: !category.status,
				})
			).unwrap();
			dispatch(getCategoryItems());
		} catch (error) {
			toast.error(error.message);
		}
	};

	const tableData =
		categories?.map((category, index) => ({
			serialNo: index + 1,

			categoryName: category.categoryName,
			description: category.description,
			createdAt: new Date(category.createdAt).toLocaleDateString(),
			status: (
				<div
					className={`text-center rounded-md py-1 font-semibold ${
						category.status
							? "bg-green-100 text-green-500"
							: "bg-red-100 text-red-600"
					}`}
				>
					{category.status ? "Active" : "Inactive"}
				</div>
			),
			action: (
				<div className="flex space-x-2">
					<LuClipboardEdit
						className="text-green-700 cursor-pointer text-xl"
						onClick={() => handleEditCategory(category)}
					/>
					<RiDeleteBin7Fill
						className="text-red-500 cursor-pointer text-xl"
						onClick={() => handleDeleteCategory(category._id)}
					/>
					<div>
						<button
							onClick={() => handleStatus(category)}
							className={`py-1 px-2 text-white font-semibold rounded ${
								category.status ? "bg-green-500" : "bg-red-500"
							}`}
						>
							<MdBlock />
						</button>
					</div>
				</div>
			),
		})) || [];

	return (
		<>
			{/* <BreadCrumbWithButton
				buttonName={"Add Category"}
				noButton={true}
				buttonNavigate={"/dashboard/categorys"}
				componentLocation={"Category"}
				location={location.pathname}
			/> */}
			<div className="flex justify-between items-center px-10 py-5 mb-4">
				<div>
					<h1 className="text-2xl font-bold">Category</h1>
					<nav className="text-gray-600 text-sm">dashboard / Category</nav>
				</div>
				<div className="flex items-center">
					<button
						className="bg-black text-white p-2 rounded-md flex items-center"
						onClick={handleOpen}
					>
						<span className="mx-2">Add Category</span>
					</button>
				</div>
			</div>
			<div>
				<ReusableTable columns={columns} data={tableData} />
			</div>
			<ConfirmationModal
				open={confirmDeleteCategory}
				onClose={() => setConfirmDeleteCategory(false)}
				message={"Are you sure about delete"}
				onConfirm={handleDeleteConfirmation}
			/>
			<CategoryForm
				open={open}
				handleClose={handleClose}
				editCategory={editCategory}
				categoryAdded={handleCategoryAdded}
			/>
		</>
	);
};

export default Category;
