import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig";

export const fetchWallet = createAsyncThunk(
	"wallet/fetchWallet",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/wallet/get-wallet");
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const createWallet = createAsyncThunk(
	"wallet/createWallet",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.post("/wallet/create-wallet");
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const addMoney = createAsyncThunk(
	"wallet/addMoney",
	async (amount, { rejectWithValue }) => {
		try {
			const response = await api.post("/wallet/add-money", { amount });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

const walletSlice = createSlice({
	name: "wallet",
	initialState: {
		wallet: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWallet.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchWallet.fulfilled, (state, action) => {
				state.wallet = action.payload;
				state.loading = false;
			})
			.addCase(fetchWallet.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(createWallet.pending, (state) => {
				state.loading = true;
			})
			.addCase(createWallet.fulfilled, (state, action) => {
				state.wallet = action.payload;
				state.loading = false;
			})
			.addCase(createWallet.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(addMoney.fulfilled, (state, action) => {
				state.wallet.balance = action.payload.balance;
				state.wallet.transactions = action.payload.transactions;
			});
	},
});

export default walletSlice.reducer;
