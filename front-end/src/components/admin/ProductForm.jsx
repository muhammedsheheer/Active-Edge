import React, { useEffect, useState, useCallback } from "react";
import BreadCrumbWithButton from "./BreadCrumbWithButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";

import { FaImage } from "react-icons/fa";
import ImageUploadSection from "./imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryItems } from "../../../redux/slices/categorySlice";
import api from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { validateProductForm } from "../../utils/FormValidation";

const ProductForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.category.categories);

	const { productId } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({});
	// const [totalStock, setTotalStock] = useState(0);
	const [getBrands, setGetBrands] = useState([]);
	const [formData, setFormData] = useState({
		productName: "",
		description: "",
		category: "",
		brand: "",
		gender: "",
		regularPrice: "",
		salePrice: "",
		sizes: [{ size: "", stock: 0 }],
	});
	const [imageData, setImageData] = useState({
		thumbnail: null,
		galleryImages: [],
	});
	console.log("edit page upload renderd");
	useEffect(() => {
		console.log("edit page upload renderd image dddddddddddddddddd");
	}, [imageData]);
	const fetchBrands = async () => {
		const response = await api.get("/brand/getbrands");
		setGetBrands(response?.data?.brandData);
	};

	useEffect(() => {
		fetchBrands();
		dispatch(getCategoryItems());
		if (productId) {
			setIsEditing(true);
			fetchProductDetial(productId);
		}
		console.log("render");
	}, [productId]);

	// fetching the current product to edit
	const fetchProductDetial = useCallback(
		async (id) => {
			try {
				const response = await api.get(`product/productDetails/${id}`);
				const product = response?.data?.productsDetails;
				console.log(product);

				setFormData({
					productName: product?.productName,
					description: product?.description,
					category: product?.category?._id,
					brand: product?.brand?._id,
					gender: product?.gender,
					regularPrice: product?.regularPrice,
					salePrice: product?.salePrice,
					sizes: product.sizes,
				});
				setImageData({
					thumbnail: product.thumbnail,
					galleryImages: product?.gallery,
				});
			} catch (error) {
				console.log(error);
			}
		},
		[productId]
	);

	const getBrandLogo = (brandId) => {
		const brand = getBrands?.find((brand) => brand?._id === brandId);
		return brand ? brand.logo : null;
	};

	const handleShowProducts = () => {
		navigate("/dashboard/products");
	};

	// size fields adding
	// const handleSizeChange = (index, field, value) => {
	// 	const newSizes = [...formData.sizes];
	// 	newSizes[index][field] = value;
	// 	setFormData({ ...formData, sizes: newSizes });
	// };

	const handleSizeChange = (index, field, value) => {
		if (field === "size" && value < 0) {
			setErrors({ ...errors, sizes: "Size cannot be negative." });
		} else if (field === "stock" && value < 0) {
			setErrors({ ...errors, stock: "Stock cannot be negative." });
		} else {
			const newSizes = [...formData.sizes];
			newSizes[index][field] = value;
			setFormData({ ...formData, sizes: newSizes });
			setErrors({ ...errors, sizes: null, stock: null });
		}
	};

	const addSize = () => {
		setFormData({
			...formData,
			sizes: [...formData.sizes, { size: "", stock: 0 }],
		});
	};

	const removeSize = (index) => {
		const newSizes = formData.sizes.filter((_, i) => i !== index);
		setFormData({ ...formData, sizes: newSizes });
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageData = (data) => {
		// setImageData(data);
	};

	const { thumbnail, galleryImages } = imageData;

	const submitProductForm = async () => {
		const validateForm = validateProductForm(formData);
		setErrors(validateForm);
		console.log(validateForm);

		if (Object.keys(validateForm).length === 0) setLoading(true);
		try {
			const data = { ...formData, ...imageData };
			let response;
			if (isEditing) {
				response = await api.put(`product/productEdit/${productId}`, data);
			} else {
				response = await api.post("product/createProduct", data);
			}
			if (response.status === 200) {
				toast.success(response.data.message);
				setFormData({
					productName: "",
					description: "",
					category: "",
					brand: "",
					gender: "",
					regularPrice: "",
					salePrice: "",
					sizes: [{ size: "", stock: 0 }],
				});
				setImageData({
					thumbnail: null,
					galleryImages: [],
				});
				if (!isEditing) {
					navigate(`/dashboard/products`);
				} else {
					navigate(`/dashboard/products`);
				}
			}
			console.log("rsp of Productadd", response);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = () => {
		submitProductForm();
	};

	return (
		<div className="container mx-auto px-4">
			<BreadCrumbWithButton
				componentLocation={isEditing ? "Edit Product" : "Add New Product"}
				location={location.pathname}
				goback={"/dashboard/products"}
				buttonName={"Show Products"}
				buttonNavigate={handleShowProducts}
			/>
			<div className="px-10 mt-8 flex flex-col md:flex-row gap-12 ">
				{/* left product details fields */}
				<div className="w-full md:w-1/2 bg-white py-10 px-5 rounded-md">
					<h2 className="text-xl font-semibold mb-4">Product Details</h2>
					<form>
						<div className="space-y-4">
							{/* product name container */}
							<div>
								<label
									className={`text-sm font-medium  flex ${
										errors.productName ? "text-red-500" : "text-gray-700"
									}`}
								>
									Product Name
									{errors.productName && (
										<p className="text-red-500 text-sm px-2">
											{errors.productName}
										</p>
									)}
								</label>
								<input
									type="text"
									id="productName"
									name="productName"
									value={formData.productName}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>

							{/* product description */}
							<div>
								<label
									className={`text-sm font-medium  flex ${
										errors.productName ? "text-red-500" : "text-gray-700"
									}`}
								>
									Description{" "}
									{errors.description && (
										<p className="text-red-500 text-sm px-2">
											{errors.description}
										</p>
									)}
								</label>
								<textarea
									id="description"
									name="description"
									rows="3"
									value={formData.description}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>

							{/* product category */}
							<div>
								<label
									className={`text-sm font-medium  flex ${
										errors.category ? "text-red-500" : "text-gray-700"
									}`}
								>
									Category
									{errors.category && (
										<p className="text-red-500 text-sm px-2">
											{errors.category}
										</p>
									)}
								</label>
								<select
									id="category"
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								>
									<option value="">Select Category</option>
									{categories?.map((category) => (
										<option key={category?._id} value={category?._id}>
											{category?.categoryName}
										</option>
									))}
								</select>
							</div>

							{/* product brand */}
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
									{getBrandLogo(formData.brand) ? (
										<img
											src={getBrandLogo(formData.brand)}
											alt={`${formData.brand} logo`}
											className="w-12 h-12 object-contain"
										/>
									) : (
										<FaImage className="w-8 h-8 text-gray-400" />
									)}
								</div>
								<div className="flex-grow">
									<label
										className={`text-sm font-medium  flex ${
											errors.brand ? "text-red-500" : "text-gray-700"
										}`}
									>
										Brand Name
										{errors.brand && (
											<p className="text-red-500 text-sm px-2">
												{errors.brand}
											</p>
										)}
									</label>
									<select
										id="brandName"
										name="brand"
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
										value={formData.brand}
										onChange={handleInputChange}
									>
										<option value="">Select Brand</option>
										{getBrands?.map((brand) => (
											<option key={brand._id} value={brand?._id}>
												{brand.brandName}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* product gender */}
							<div>
								<label
									className={`text-sm font-medium  flex ${
										errors.gender ? "text-red-500" : "text-gray-700"
									}`}
								>
									Gender
									{errors.gender && (
										<p className="text-red-500 text-sm px-2">{errors.gender}</p>
									)}
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								>
									<option value="">Select gender</option>
									<option value="Men">Men</option>
									<option value="Women">Women</option>
									<option value="Kids">Kids</option>
								</select>
							</div>

							{/* product stock */}
							{/* product price */}
							<div className="flex gap-4">
								<div className="w-1/2">
									<label
										className={`text-sm font-medium  flex ${
											errors.regularPrice ? "text-red-500" : "text-gray-700"
										}`}
									>
										Regular Price
										{errors.regularPrice && (
											<p className="text-red-500 text-sm px-2">
												{errors.regularPrice}
											</p>
										)}
									</label>
									<input
										type="number"
										id="regularPrice"
										name="regularPrice"
										value={formData.regularPrice}
										onChange={handleInputChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									/>
								</div>

								{/* sale price */}
								<div className="w-1/2">
									<label
										className={`text-sm font-medium  flex ${
											errors.salePrice ? "text-red-500" : "text-gray-700"
										}`}
									>
										Sale Price
										{errors.salePrice && (
											<p className="text-red-500 text-sm px-2">
												{errors.salePrice}
											</p>
										)}
									</label>
									<input
										type="number"
										id="salePrice"
										name="salePrice"
										value={formData.salePrice}
										onChange={handleInputChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									/>
								</div>
							</div>
							<div>
								{/* Sizes and Stock */}

								{formData.sizes?.map((sizeObj, index) => (
									<div key={index} className="flex items-center gap-2 mt-2">
										<div className="relative flex-grow">
											<input
												type="number"
												placeholder="Size"
												value={sizeObj.size}
												onChange={(e) =>
													handleSizeChange(index, "size", e.target.value)
												}
												className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
											/>
											{errors[`sizes[${index}].size`] && (
												<p className="absolute text-red-600 text-xs mt-1">
													{errors[`sizes[${index}].size`]}
												</p>
											)}
										</div>
										<div className="relative flex-grow">
											<input
												type="number"
												placeholder="Stock"
												value={sizeObj.stock}
												onChange={(e) =>
													handleSizeChange(index, "stock", e.target.value)
												}
												className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
											/>
											{errors[`sizes[${index}].stock`] && (
												<p className="absolute text-red-600 text-xs mt-1">
													{errors[`sizes[${index}].stock`]}
												</p>
											)}
										</div>
										<button
											type="button"
											onClick={() => removeSize(index)}
											className="p-1 text-red-600 border-2 border-red-600 rounded-sm"
										>
											<AiFillCloseSquare />
										</button>
									</div>
								))}
								<button
									type="button"
									onClick={addSize}
									className="mt-2 p-2 bg-black text-white rounded-md flex items-center"
								>
									Add Size
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="w-full md:w-1/2  bg-white py-10 px-5 rounded-md ">
					<ImageUploadSection
						onImageData={setImageData}
						editingImage={imageData}
					/>
				</div>
			</div>
			{/* Updated button container */}
			<div className="mt-6 px-20">
				<div className="flex justify-end space-x-3">
					<button
						type="button"
						onClick={handleSubmit}
						className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
					>
						{isEditing ? "Update" : "Save"}
					</button>

					<button
						type="button"
						className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
						onClick={() => navigate("/dashboard/products")}
					>
						Cancel
					</button>
				</div>
			</div>
			{/* Loading spinner */}
			{loading && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default ProductForm;
