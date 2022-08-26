import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetExtraPayloadType } from "interfaces/common";
import {
	AddManyProductOptionPayload,
	ProductOption,
} from "interfaces/productOption";
import { RootState } from "redux/store";

export interface ProductOptionList extends FetchState {
	list: ProductOption[];
}

export interface Inventory extends FetchState {
	list: ProductOption[];
	current: ProductOption | null;
}

interface StateType {
	productOptionList: ProductOptionList;
	productOption: FetchState;
	inventory: Inventory;
}
const initialState: StateType = {
	productOptionList: {
		list: [],
		isLoading: false,
		isError: false,
	},
	productOption: {
		isLoading: false,
		isError: false,
	},
	inventory: {
		isLoading: false,
		isError: false,
		list: [],
		current: null,
	},
};

export const productOptionSlice = createSlice({
	name: "productOption",
	initialState,
	reducers: {
		addManyProductOptionFetch: (
			state,
			action: PayloadAction<AddManyProductOptionPayload>
		) => {
			state.productOption.isLoading = true;
			state.productOption.isError = false;
		},
		addManyProductOptionSuccess: (state) => {
			state.productOption.isLoading = false;
		},
		addManyProductOptionFailure: (state) => {
			state.productOption.isLoading = false;
			state.productOption.isError = true;
		},
		getAllInventoryFetch: (
			state,
			action: PayloadAction<GetExtraPayloadType>
		) => {
			state.inventory.isLoading = true;
			state.inventory.isError = false;
		},
		getAllInventorySuccess: (
			state,
			action: PayloadAction<ProductOption[]>
		) => {
			state.inventory.isLoading = false;
			state.inventory.list = action.payload;
		},
		getAllInventoryFailure: (state) => {
			state.inventory.isLoading = false;
			state.inventory.isError = true;
		},
		getCurrentInventory: (state, action: PayloadAction<ProductOption>) => {
			state.inventory.current = action.payload;
		},
	},
});

export const productOptionActions = productOptionSlice.actions;

export const productOptionState = (state: RootState) => state.productOption;
