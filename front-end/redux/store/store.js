import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import categoryReducer from "../slices/categorySlice.js";
import wishlistReducer from "../slices/wishlistSlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		wishlist: wishlistReducer,
	},
});

export default store;
