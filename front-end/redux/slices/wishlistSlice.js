import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig";

export const handleWishlist = createAsyncThunk(
	"wishlist/handleWishlist",
	async ({ userId, productId }, { getState, rejectWithValue }) => {
		const state = getState();
		try {
			const response = await api.post("/wishlist/handle-wishlist", {
				userId,
				productId,
			});
			console.log("handlewish", response);

			return response?.data?.wishlist?.products;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.response?.data?.message || "Failed to handle wishlist."
			);
		}
	}
);

export const getWishlist = createAsyncThunk(
	"wishlist/getWishlist",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await api.get(`/wishlist/get-wishlist/${userId}`);
			console.log("getwish", response);

			return response?.data?.wishlist?.products;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.response?.data?.message || "Failed to fetch wishlist."
			);
		}
	}
);

const wishListSlice = createSlice({
	name: "wishlist",
	initialState: {
		products: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getWishlist.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getWishlist.fulfilled, (state, action) => {
				state.status = "success";
				console.log(action.payload);

				state.products = action.payload;
			})
			.addCase(getWishlist.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(handleWishlist.fulfilled, (state, action) => {
				state.products = action.payload;
			})
			.addCase(handleWishlist.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default wishListSlice.reducer;
