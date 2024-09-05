// import React, { useState, useEffect } from "react";
// import {
// 	Modal,
// 	Box,
// 	TextField,
// 	Button,
// 	IconButton,
// 	Typography,
// 	MenuItem,
// 	Select,
// 	FormControl,
// 	InputLabel,
// } from "@mui/material";
// import { AiFillCloseCircle } from "react-icons/ai";
// import api from "../../config/axiosConfig";
// import { toast } from "react-toastify";

// const OfferModal = ({ open, handleClose, productOffers, categoryOffers }) => {
// 	const [categories, setCategories] = useState([]);
// 	const [products, setProducts] = useState([]);

// 	const [formData, setFormData] = useState({
// 		offerType: "Category",
// 		selectedCategory: "",
// 		selectedProduct: "",
// 		discountPercentage: "",
// 		startDate: "",
// 		endDate: "",
// 		description: "",
// 	});

// 	useEffect(() => {
// 		if (open) {
// 			fetchCategories();
// 			fetchProducts();
// 		}
// 	}, [open]);

// 	const fetchCategories = async () => {
// 		try {
// 			const response = await api.get("/category/getCategories");
// 			console.log("the response", response);

// 			setCategories(response.data.categoryData);
// 		} catch (error) {
// 			console.error("Failed to fetch categories", error);
// 		}
// 	};

// 	const fetchProducts = async () => {
// 		try {
// 			const response = await api.get("/product/getProducts");
// 			setProducts(response.data.products);
// 		} catch (error) {
// 			console.error("Failed to fetch products", error);
// 		}
// 	};

// 	const handleInputChange = (event) => {
// 		const { name, value } = event.target;
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};

// 	const handleOfferTypeChange = (event) => {
// 		setFormData({
// 			...formData,
// 			offerType: event.target.value,
// 			selectedCategory: "",
// 			selectedProduct: "",
// 		});
// 	};

// 	const handleCategoryChange = (event) => {
// 		setFormData({
// 			...formData,
// 			selectedCategory: event.target.value,
// 		});
// 	};

// 	const handleProductChange = (event) => {
// 		setFormData({
// 			...formData,
// 			selectedProduct: event.target.value,
// 		});
// 	};

// 	const handleSubmit = async () => {
// 		const payload = {
// 			name:
// 				formData.offerType === "Category" ? "Category Offer" : "Product Offer",
// 			offerType: formData.offerType,
// 			discountPercentage: formData.discountPercentage,
// 			startDate: formData.startDate,
// 			endDate: formData.endDate,
// 			description: formData.description,
// 			targetOfferId:
// 				formData.offerType === "Category"
// 					? formData.selectedCategory
// 					: formData.selectedProduct,
// 		};

// 		try {
// 			const response = await api.post("/offer/create-offer", payload);
// 			toast.success(response?.data?.message);
// 			setFormData({
// 				offerType: "Category",
// 				selectedCategory: "",
// 				selectedProduct: "",
// 				discountPercentage: "",
// 				startDate: "",
// 				endDate: "",
// 				description: "",
// 			});
// 			handleClose();
// 		} catch (error) {
// 			console.error("Failed to create offer", error);
// 			toast.error(error?.response?.data?.message);
// 		}

// 		console.log("this is frm the offer modal", payload);
// 	};

// 	const offeredProductIds = new Set(
// 		productOffers
// 			.filter((offer) => offer.offerType === "Products")
// 			.map((offer) => offer.targetOfferId._id)
// 	);

// 	const availableProducts = products.filter(
// 		(product) => !offeredProductIds.has(product._id)
// 	);

// 	const offerCategoryIds = new Set(
// 		categoryOffers
// 			.filter((offer) => offer.offerType === "Category")
// 			.map((offer) => offer.targetOfferId._id)
// 	);

// 	const availableCategorys = categories.filter(
// 		(category) => !offerCategoryIds.has(category._id)
// 	);

// 	const currentDate = new Date().toISOString().split("T")[0];
// 	console.log("this is frm the offer modal ", categories);
// 	console.log("this is also form the offer modal avail", categoryOffers);
// 	return (
// 		<Modal
// 			open={open}
// 			onClose={handleClose}
// 			aria-labelledby="offer-modal-title"
// 		>
// 			<Box sx={modalStyle}>
// 				<IconButton
// 					aria-label="close"
// 					onClick={handleClose}
// 					sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
// 				>
// 					<AiFillCloseCircle size={30} />
// 				</IconButton>

// 				<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
// 					Add Offer
// 				</Typography>

// 				<Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
// 					<FormControl fullWidth sx={{ mb: 2 }}>
// 						<InputLabel id="offer-type-label">Offer Type</InputLabel>
// 						<Select
// 							labelId="offer-type-label"
// 							name="offerType"
// 							value={formData.offerType}
// 							onChange={handleOfferTypeChange}
// 							label="Offer Type"
// 						>
// 							<MenuItem value="Category">Category</MenuItem>
// 							<MenuItem value="Products">Product</MenuItem>
// 						</Select>
// 					</FormControl>

// 					{formData.offerType === "Category" && (
// 						<FormControl fullWidth sx={{ mb: 2 }}>
// 							<InputLabel id="category-select-label">Category</InputLabel>
// 							<Select
// 								labelId="category-select-label"
// 								label="Category"
// 								name="selectedCategory"
// 								value={formData.selectedCategory}
// 								onChange={handleCategoryChange}
// 							>
// 								{availableCategorys.map((category) => (
// 									<MenuItem key={category._id} value={category._id}>
// 										{category.categoryName}
// 									</MenuItem>
// 								))}
// 							</Select>
// 						</FormControl>
// 					)}

// 					{formData.offerType === "Products" && (
// 						<FormControl fullWidth sx={{ mb: 2 }}>
// 							<InputLabel id="product-select-label">Product</InputLabel>
// 							<Select
// 								labelId="product-select-label"
// 								label="Product"
// 								name="selectedProduct"
// 								value={formData.selectedProduct}
// 								onChange={handleProductChange}
// 							>
// 								{availableProducts?.map((product) => (
// 									<MenuItem key={product._id} value={product._id}>
// 										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// 											{product.productName}
// 											<img
// 												src={product.thumbnail}
// 												alt={product.productName}
// 												width={40}
// 												height={40}
// 											/>
// 										</Box>
// 									</MenuItem>
// 								))}
// 							</Select>
// 						</FormControl>
// 					)}

// 					<TextField
// 						label="Discount Percentage"
// 						fullWidth
// 						sx={{ mb: 2 }}
// 						name="discountPercentage"
// 						value={formData.discountPercentage}
// 						onChange={handleInputChange}
// 					/>
// 					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// 						<TextField
// 							label="Starting Date"
// 							type="date"
// 							InputLabelProps={{ shrink: true }}
// 							sx={{ width: "48%", cursor: "pointer" }}
// 							inputProps={{ min: currentDate }}
// 							name="startDate"
// 							value={formData.startDate}
// 							onChange={handleInputChange}
// 						/>
// 						<TextField
// 							label="Ending Date"
// 							type="date"
// 							InputLabelProps={{ shrink: true }}
// 							sx={{ width: "48%", cursor: "pointer" }}
// 							inputProps={{ min: currentDate }}
// 							name="endDate"
// 							value={formData.endDate}
// 							onChange={handleInputChange}
// 						/>
// 					</Box>
// 					<TextField
// 						label="Description"
// 						multiline
// 						rows={3}
// 						placeholder="Description"
// 						fullWidth
// 						sx={{ mb: 4 }}
// 						name="description"
// 						value={formData.description}
// 						onChange={handleInputChange}
// 					/>
// 					<Box sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
// 						<Button
// 							variant="contained"
// 							color="primary"
// 							sx={{ bgcolor: "black" }}
// 							onClick={handleSubmit}
// 						>
// 							Save
// 						</Button>
// 						<Button
// 							variant="outlined"
// 							onClick={handleClose}
// 							sx={{ color: "black", borderColor: "black" }}
// 						>
// 							Cancel
// 						</Button>
// 					</Box>
// 				</Box>
// 			</Box>
// 		</Modal>
// 	);
// };

// const modalStyle = {
// 	position: "absolute",
// 	top: "50%",
// 	left: "50%",
// 	transform: "translate(-50%, -50%)",
// 	width: 600,
// 	bgcolor: "background.paper",
// 	border: "none",
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: "8px",
// };

// export default OfferModal;

import React, { useState, useEffect } from "react";
import {
	Modal,
	Box,
	TextField,
	Button,
	IconButton,
	Typography,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import api from "../../config/axiosConfig";
import { toast } from "react-toastify";

const OfferModal = ({ open, handleClose, productOffers, categoryOffers }) => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	const [formData, setFormData] = useState({
		offerName: "",
		offerType: "Category",
		selectedCategory: "",
		selectedProduct: "",
		discountPercentage: "",
		startDate: "",
		endDate: "",
		description: "",
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open) {
			fetchCategories();
			fetchProducts();
		}
	}, [open]);

	const fetchCategories = async () => {
		try {
			const response = await api.get("/category/getCategories");
			setCategories(response.data.categoryData);
		} catch (error) {
			console.error("Failed to fetch categories", error);
		}
	};

	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");
			setProducts(response.data.products);
		} catch (error) {
			console.error("Failed to fetch products", error);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleOfferTypeChange = (event) => {
		setFormData({
			...formData,
			offerType: event.target.value,
			selectedCategory: "",
			selectedProduct: "",
		});
	};

	const handleCategoryChange = (event) => {
		setFormData({
			...formData,
			selectedCategory: event.target.value,
		});
	};

	const handleProductChange = (event) => {
		setFormData({
			...formData,
			selectedProduct: event.target.value,
		});
	};

	const validateForm = () => {
		let tempErrors = {};

		if (!formData.offerName) {
			tempErrors.offerName = "Offer name is required";
		}
		if (!formData.discountPercentage) {
			tempErrors.discountPercentage = "Discount percentage is required";
		} else if (
			isNaN(formData.discountPercentage) ||
			formData.discountPercentage <= 0
		) {
			tempErrors.discountPercentage = "Please enter a valid percentage";
		}
		if (!formData.startDate) {
			tempErrors.startDate = "Start date is required";
		}
		if (!formData.endDate) {
			tempErrors.endDate = "End date is required";
		} else if (formData.endDate < formData.startDate) {
			tempErrors.endDate = "End date cannot be earlier than start date";
		}
		if (formData.offerType === "Category" && !formData.selectedCategory) {
			tempErrors.selectedCategory = "Please select a category";
		}
		if (formData.offerType === "Products" && !formData.selectedProduct) {
			tempErrors.selectedProduct = "Please select a product";
		}

		setErrors(tempErrors);

		return Object.keys(tempErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			const payload = {
				name:
					formData.offerName ||
					(formData.offerType === "Category"
						? "Category Offer"
						: "Product Offer"),
				offerType: formData.offerType,
				discountPercentage: formData.discountPercentage,
				startDate: formData.startDate,
				endDate: formData.endDate,
				description: formData.description,
				targetOfferId:
					formData.offerType === "Category"
						? formData.selectedCategory
						: formData.selectedProduct,
			};

			try {
				const response = await api.post("/offer/create-offer", payload);
				toast.success(response?.data?.message);
				setFormData({
					offerName: "",
					offerType: "Category",
					selectedCategory: "",
					selectedProduct: "",
					discountPercentage: "",
					startDate: "",
					endDate: "",
					description: "",
				});
				handleClose();
			} catch (error) {
				console.error("Failed to create offer", error);
				toast.error(error?.response?.data?.message);
			}

			console.log("Offer created with payload:", payload);
		} else {
			toast.error("Please fill out all required fields correctly.");
		}
	};

	const offeredProductIds = new Set(
		productOffers
			.filter((offer) => offer.offerType === "Products")
			.map((offer) => offer.targetOfferId._id)
	);

	const availableProducts = products.filter(
		(product) => !offeredProductIds.has(product._id)
	);

	const offerCategoryIds = new Set(
		categoryOffers
			.filter((offer) => offer.offerType === "Category")
			.map((offer) => offer.targetOfferId._id)
	);

	const availableCategories = categories.filter(
		(category) => !offerCategoryIds.has(category._id)
	);

	const currentDate = new Date().toISOString().split("T")[0];

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="offer-modal-title"
		>
			<Box sx={modalStyle}>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
				>
					<AiFillCloseCircle size={30} />
				</IconButton>

				<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
					Add Offer
				</Typography>

				<Box component="form" noValidate autoComplete="off" sx={formStyle}>
					<TextField
						label="Offer Name"
						fullWidth
						sx={{ mb: 2 }}
						name="offerName"
						value={formData.offerName}
						onChange={handleInputChange}
						error={Boolean(errors.offerName)}
						helperText={errors.offerName}
					/>

					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel id="offer-type-label">Offer Type</InputLabel>
						<Select
							labelId="offer-type-label"
							name="offerType"
							value={formData.offerType}
							onChange={handleOfferTypeChange}
							label="Offer Type"
						>
							<MenuItem value="Category">Category</MenuItem>
							<MenuItem value="Products">Product</MenuItem>
						</Select>
					</FormControl>

					{formData.offerType === "Category" && (
						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="category-select-label">Category</InputLabel>
							<Select
								labelId="category-select-label"
								label="Category"
								name="selectedCategory"
								value={formData.selectedCategory}
								onChange={handleCategoryChange}
								error={Boolean(errors.selectedCategory)}
							>
								{availableCategories.map((category) => (
									<MenuItem key={category._id} value={category._id}>
										{category.categoryName}
									</MenuItem>
								))}
							</Select>
							{errors.selectedCategory && (
								<Typography color="error" variant="caption">
									{errors.selectedCategory}
								</Typography>
							)}
						</FormControl>
					)}

					{formData.offerType === "Products" && (
						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="product-select-label">Product</InputLabel>
							<Select
								labelId="product-select-label"
								label="Product"
								name="selectedProduct"
								value={formData.selectedProduct}
								onChange={handleProductChange}
								error={Boolean(errors.selectedProduct)}
							>
								{availableProducts.map((product) => (
									<MenuItem key={product._id} value={product._id}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											{product.productName}
											<img
												src={product.thumbnail}
												alt={product.productName}
												width={40}
												height={40}
											/>
										</Box>
									</MenuItem>
								))}
							</Select>
							{errors.selectedProduct && (
								<Typography color="error" variant="caption">
									{errors.selectedProduct}
								</Typography>
							)}
						</FormControl>
					)}

					<TextField
						label="Discount Percentage"
						fullWidth
						sx={{ mb: 2 }}
						name="discountPercentage"
						value={formData.discountPercentage}
						onChange={handleInputChange}
						error={Boolean(errors.discountPercentage)}
						helperText={errors.discountPercentage}
						type="number"
						InputProps={{ inputProps: { min: 0, max: 100 } }}
					/>

					<TextField
						fullWidth
						sx={{ mb: 2 }}
						name="startDate"
						type="date"
						value={formData.startDate}
						onChange={handleInputChange}
						error={Boolean(errors.startDate)}
						helperText={errors.startDate}
						InputProps={{ inputProps: { min: currentDate } }}
					/>

					<TextField
						fullWidth
						sx={{ mb: 2 }}
						name="endDate"
						type="date"
						value={formData.endDate}
						onChange={handleInputChange}
						error={Boolean(errors.endDate)}
						helperText={errors.endDate}
						InputProps={{
							inputProps: { min: formData.startDate || currentDate },
						}}
					/>

					<TextField
						label="Description"
						fullWidth
						sx={{ mb: 2 }}
						name="description"
						multiline
						minRows={3}
						maxRows={5}
						value={formData.description}
						onChange={handleInputChange}
					/>

					<Button
						variant="contained"
						color="inherit"
						fullWidth
						onClick={handleSubmit}
					>
						Create Offer
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50vw",
	maxHeight: "80vh",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: "16px",
	overflowY: "auto",
};

const formStyle = {
	maxWidth: "600px",
	margin: "0 auto",
};

export default OfferModal;
