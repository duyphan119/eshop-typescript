import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { Order } from "~/types/order";

export interface OrderState {
	loading: boolean;
	error: boolean;
	list: Order[];
}

const initialState: OrderState = {
	loading: false,
	error: false,
	list: [],
};

export const orderSlice = createSlice({
	name: "order",
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
		getOrders: (state, action: PayloadAction<Order[]>) => {
			state.list = action.payload;
			state.loading = false;
		},
		createOrder: (state, action: PayloadAction<Order>) => {
			state.list.unshift(action.payload);
			state.loading = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const orderActions = orderSlice.actions;

export const orderState = (state: RootState) => state.order;

export default orderSlice.reducer;
