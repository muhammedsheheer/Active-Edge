import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import categoryReducer from "../slices/categorySlice.js";
import wishlistReducer from "../slices/wishlistSlice.js";
import cartReducer from "../slices/cartSlice.js";
import addressReducer from "../slices/addressSlice.js";
import walleReducer from "../slices/walletSlice.js";
const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		wishlist: wishlistReducer,
		cart: cartReducer,
		address: addressReducer,
		wallet: walleReducer,
	},
});

export default store;
