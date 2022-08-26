import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetAllResponse } from "interfaces/common";
import { GetAllOrdersPayload, Order } from "interfaces/order";
import { RootState } from "redux/store";
interface OrderListState {
	page: number;
	pageSize: number;
	openModal: boolean;
}
interface StateType extends FetchState {
	orders: GetAllResponse<Order>;
	currentOrder: Order | null;
	orderList: OrderListState;
}

const initialState: StateType = {
	orders: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	currentOrder: null,
	orderList: {
		page: 1,
		pageSize: 10,
		openModal: false,
	},
	isLoading: false,
	isError: false,
};
const name = "order";
export const orderSlice = createSlice({
	name,
	initialState,
	reducers: {
		getOrdersFetch: (state, action: PayloadAction<GetAllOrdersPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getMyOrdersFetch: (state, action: PayloadAction<GetAllOrdersPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getOrdersSuccess: (state, action: PayloadAction<GetAllResponse<Order>>) => {
			state.isLoading = false;
			state.orders = action.payload;
		},
		getOrdersFailure: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		setOrderListState: (state, action: PayloadAction<OrderListState>) => {
			state.orderList = action.payload;
		},
	},
});

export const orderActions = orderSlice.actions;
export const getOrdersFetch = `${name}/getOrdersFetch`;
export const getMyOrdersFetch = `${name}/getMyOrdersFetch`;

export const orderState = (state: RootState) => state.order;
