import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField,
	Grid,
	IconButton,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	addCategoryItems,
	editCategoryItem,
} from "../../../redux/slices/categorySlice";

const CategoryForm = ({ open, handleClose, editCategory, categoryAdded }) => {
	const [categoryName, setCategoryName] = useState("");
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (editCategory) {
			setCategoryName(editCategory.categoryName);
			setDescription(editCategory.description);
		} else {
			setCategoryName("");
			setDescription("");
		}
	}, [editCategory]);

	const handleSaveCategory = async () => {
		try {
			if (editCategory) {
				await dispatch(
					editCategoryItem({
						_id: editCategory._id,
						categoryName,
						description,
					})
				).unwrap();
				toast.success("Category updated successfully");
			} else {
				await dispatch(
					addCategoryItems({
						categoryName,
						description,
					})
				).unwrap();
				toast.success("Category added successfully");
			}
			handleClose();
			setCategoryName("");
			setDescription("");
			categoryAdded();
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
			<DialogTitle
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingBottom: "8px",
				}}
			>
				{editCategory ? "Edit Category" : "Add New Category"}
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<AiOutlineClose />
				</IconButton>
			</DialogTitle>
			<DialogContent
				sx={{
					paddingTop: "10px",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoFocus
							margin="dense"
							id="categoryName"
							label="Category Name"
							type="text"
							fullWidth
							variant="outlined"
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="dense"
							id="description"
							label="Description"
							type="text"
							fullWidth
							variant="outlined"
							multiline
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: "flex-end",
					paddingBottom: "20px",
					marginRight: "20px",
				}}
			>
				<Button
					onClick={handleSaveCategory}
					sx={{
						backgroundColor: "black",
						color: "white",
						marginRight: "10px",
						"&:hover": {
							backgroundColor: "black",
						},
					}}
				>
					{editCategory ? "Update" : "Save"}
				</Button>
				<Button
					onClick={handleClose}
					sx={{
						backgroundColor: "white",
						color: "black",
						border: "1px solid black",
						"&:hover": {
							backgroundColor: "white",
						},
					}}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CategoryForm;
