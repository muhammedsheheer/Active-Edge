import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig.js";

export const getCategoryItems = createAsyncThunk(
	"category/getCategoryItems",
	async () => {
		const response = await api.get("/category/getCategories");
		return response.data.categoryData;
	}
);

export const addCategoryItems = createAsyncThunk(
	"category/addCategoryItems",
	async (newCategory, { rejectWithValue }) => {
		try {
			const response = await api.post("/category/createCategory", newCategory);
			return response.data.categoryData;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: error.message }
			);
		}
	}
);

export const editCategoryItem = createAsyncThunk(
	"category/editCategoryItem",
	async (editCategory, { rejectWithValue }) => {
		try {
			const response = await api.put(
				`/category/updateCategory/${editCategory._id}`,
				editCategory
			);
			return response.data.categoryData;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: error.message }
			);
		}
	}
);

export const deleteCategoryItem = createAsyncThunk(
	"category/deleteCategoryItem",
	async (id) => {
		await api.delete(`/category/deleteCategory/${id}`);
		return id;
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState: {
		categories: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// get category items
			.addCase(getCategoryItems.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getCategoryItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories = action.payload;
			})
			.addCase(getCategoryItems.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload?.message;
			})
			//add category items
			.addCase(addCategoryItems.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addCategoryItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories.push(action.payload);
			})
			.addCase(addCategoryItems.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload.message;
			})
			//edit category item
			.addCase(editCategoryItem.pending, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(editCategoryItem.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.categories.findIndex(
					(category) => category._id == action.payload._id
				);
				if (index !== -1) {
					state.categories[index] = action.payload;
				}
			})
			.addCase(editCategoryItem.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload.message;
			})
			// delete category item
			.addCase(deleteCategoryItem.fulfilled, (state, action) => {
				state.categories = state.categories.filter(
					(categories) => categories._id !== action.payload
				);
			});
	},
});

export default categorySlice.reducer;
