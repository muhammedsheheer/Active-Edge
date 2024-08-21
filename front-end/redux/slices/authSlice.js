import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: {
			user: null,
			isAuthenticated: false,
			status: "idle",
			role: null,
	  };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
			console.log("the pay load user", action.payload.user);

			state.isAuthenticated = action.payload.isAuthenticated;
			state.status = "success";
			state.role = action.payload.role;
			localStorage.setItem("user", JSON.stringify({ ...state }));
		},
		logoutUser: (state) => {
			state.user = null;
			state.role = null;
			state.status = "idle";
			state.isAuthenticated = false;
			localStorage.removeItem("user");
		},
	},
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
