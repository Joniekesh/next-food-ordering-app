import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			state.products.push(action.payload);
			state.quantity += 1;
			state.total += action.payload.price * action.payload.quantity;
		},
		resetCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
		removeFromCart: (state, action) => {
			state.products.splice(
				state.products.findIndex((id) => id === action.payload),
				1
			);
			state.quantity -= 1;
			// state.total -= action.payload.price * action.payload.quantity;
		},
	},
});

export const { addToCart, resetCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
