import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import categoryReducer from "../slices/categorySlice.js";
import wishlistReducer from "../slices/wishlistSlice.js";
import cartReducer from "../slices/cartSlice.js";
import addressReducer from "../slices/addressSlice.js";
const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		wishlist: wishlistReducer,
		cart: cartReducer,
		address: addressReducer,
	},
});

export default store;
