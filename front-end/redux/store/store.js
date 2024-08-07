import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import categoryReducer from "../slices/categorySlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
	},
});

export default store;
