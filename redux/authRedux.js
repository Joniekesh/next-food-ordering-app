import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: false,
		error: null,
	},
	reducers: {
		registerRequest: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		registerFail: (state, action) => {
			state.user = null;
			state.loading = false;
			state.error = action.payload;
		},
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		loginFail: (state, action) => {
			state.user = null;
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const {
	registerRequest,
	registerSuccess,
	registerFail,
	loginRequest,
	loginSuccess,
	loginFail,
	logout,
} = userSlice.actions;
export default userSlice.reducer;
