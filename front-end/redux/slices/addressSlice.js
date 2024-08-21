import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig";

const initialState = {
	addresses: [],
	loading: false,
	error: null,
};

export const getAddress = createAsyncThunk(
	"address/getAddress",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/users/get-address");

			return response.data.addresses;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const addAddress = createAsyncThunk(
	"address/addAddress",
	async (addressData, { rejectWithValue }) => {
		try {
			const response = await api.post("/users/add-address", addressData);
			console.log("the response", response);
			return response.data.user.addresses;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const editAddress = createAsyncThunk(
	"address/editAddress",
	async ({ addressId, addressData }, { rejectWithValue }) => {
		try {
			const response = await api.put(
				`/users/edit-address/${addressId}`,
				addressData
			);
			return response.data.user.addresses;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const removeAddress = createAsyncThunk(
	"address/removeAddress",
	async (addressId, { rejectWithValue }) => {
		try {
			await api.delete(`/users/remove-address/${addressId}`);
			return addressId;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAddress.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAddress.fulfilled, (state, action) => {
				state.loading = false;
				state.addresses = action.payload;
			})
			.addCase(getAddress.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addAddress.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addAddress.fulfilled, (state, action) => {
				state.loading = false;
				state.addresses = action.payload;
			})
			.addCase(addAddress.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(editAddress.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(editAddress.fulfilled, (state, action) => {
				state.loading = false;
				state.addresses = action.payload;
			})
			.addCase(editAddress.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(removeAddress.fulfilled, (state, action) => {
				state.loading = false;
				state.addresses = state.addresses.filter(
					(address) => address._id !== action.payload
				);
			});
	},
});

export default addressSlice.reducer;
