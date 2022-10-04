import { createSlice } from "@reduxjs/toolkit";

const deliveryAddressSlice = createSlice({
	name: "address",
	initialState: {
		userAddress: null,
	},
	reducers: {
		addAddress: (state, action) => {
			state.userAddress = action.payload;
		},
		resetAddress: (state) => {
			state.userAddress = null;
		},
	},
});

export const { addAddress, resetAddress } = deliveryAddressSlice.actions;
export default deliveryAddressSlice.reducer;
