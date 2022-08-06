import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { User } from "~/types/user";

export interface AuthState {
	loading: boolean;
	error: boolean;
	currentUser: User | null;
}

const initialState: AuthState = {
	loading: false,
	error: false,
	currentUser: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		fetch: (state) => {
			state.loading = true;
			state.error = false;
		},
		error: (state) => {
			state.loading = false;
			state.error = true;
		},
		getProfile: (state, action: PayloadAction<User | null>) => {
			state.loading = false;
			state.currentUser = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
