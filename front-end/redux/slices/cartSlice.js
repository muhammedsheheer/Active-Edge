import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig";

export const getCarItems = createAsyncThunk(
	"cart/getCartItems",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/cart/get-to-cart");
			console.log("response get carts", response.data.cart);
			return response.data.cart;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const addCartItems = createAsyncThunk(
	"cart/addCartItems",
	async ({ productId, size }, { rejectWithValue }) => {
		try {
			const response = await api.post("/cart/add-to-cart", { productId, size });
			console.log("the response", response);
			return response.data.cart;
		} catch (error) {
			const message = error.response?.data?.message || "An error occurred";
			return rejectWithValue(message);
		}
	}
);

export const removeCartItem = createAsyncThunk(
	"cart/removeCartItem",
	async (productId, { rejectWithValue }) => {
		try {
			await api.delete(`/cart/remove-to-cart/${productId}`);
			return productId;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const updateCartItem = createAsyncThunk(
	"cart/updateCartItem",
	async ({ productId, size, quantity }, { rejectWithValue }) => {
		try {
			const response = await api.put(`/cart/update-to-cart/${productId}`, {
				size,
				quantity,
			});
			return response.data.cart;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const clearCart = createAsyncThunk(
	"cart/clearCart",
	async (_, { rejectWithValue }) => {
		try {
			await api.delete("/cart/clear-to-cart");
			return [];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCarItems.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCarItems.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems = action.payload;
			})
			.addCase(getCarItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addCartItems.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems.push(action.payload);
			})
			.addCase(removeCartItem.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems = {
					...state.cartItems,
					items: state.cartItems.items.filter(
						(item) => item.productId._id !== action.payload
					),
				};
			})
			.addCase(updateCartItem.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems = action.payload;
			})
			.addCase(clearCart.fulfilled, (state) => {
				state.loading = false;
				state.cartItems = [];
			});
	},
});

export default cartSlice.reducer;
