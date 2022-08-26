import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetAllResponse } from "interfaces/common";
import {
	CreateVariantValuePayload,
	DeleteManyVariantValuesPayload,
	DeleteVariantValuePayload,
	GetVariantValueQueryParams,
	UpdateVariantValuePayload,
	VariantValue,
} from "interfaces/variantValue";
import { RootState } from "redux/store";

interface StateType extends FetchState {
	variantValues: GetAllResponse<VariantValue>;
	currentVariantValue: VariantValue | null;
}

const initialState: StateType = {
	isLoading: false,
	isError: false,
	variantValues: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	currentVariantValue: null,
};
const name = "variantValue";
export const variantValueSlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllVariantValuesFetch: (state, action: PayloadAction<GetVariantValueQueryParams>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllVariantValuesSuccess: (state, action: PayloadAction<GetAllResponse<VariantValue>>) => {
			state.isLoading = false;
			state.variantValues = action.payload;
		},
		getAllVariantValuesFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentVariantValue: (state, action: PayloadAction<VariantValue | null>) => {
			if ((state.currentVariantValue && !action.payload) || (!state.currentVariantValue && action.payload)) {
				state.currentVariantValue = action.payload;
			}
		},
		createVariantValueFetch: (state, action: PayloadAction<CreateVariantValuePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createVariantValueSuccess: (state, action: PayloadAction<VariantValue>) => {
			state.isLoading = false;
			state.variantValues.items.unshift(action.payload);
			state.variantValues.count += 1;
		},
		createVariantValueFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateVariantValueFetch: (state, action: PayloadAction<UpdateVariantValuePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateVariantValueSuccess: (state, action: PayloadAction<VariantValue>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.variantValues.items.findIndex((item: VariantValue) => item.id === newData.id);
			if (index !== -1) {
				state.variantValues.items[index] = {
					...state.variantValues.items[index],
					...newData,
				};
			}
		},
		updateVariantValueFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteVariantValueFetch: (state, action: PayloadAction<DeleteVariantValuePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteVariantValueSuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.variantValues.items = state.variantValues.items.filter((item: VariantValue) => item.id !== id);
			state.variantValues.count -= 1;
		},
		deleteVariantValueFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyVariantValueFetch: (state, action: PayloadAction<DeleteManyVariantValuesPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyVariantValueSuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.variantValues.items = state.variantValues.items.filter((item: VariantValue) => !ids.includes(item.id));
			state.variantValues.count -= 1;
		},
		deleteManyVariantValueFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
	},
});

export const variantValueActions = variantValueSlice.actions;

export const getAllVariantValuesAction = `${name}/getAllVariantValuesFetch`;
export const createVariantValueAction = `${name}/createVariantValueFetch`;
export const updateVariantValueAction = `${name}/updateVariantValueFetch`;
export const deleteVariantValueAction = `${name}/deleteVariantValueFetch`;
export const deleteManyVariantValueAction = `${name}/deleteManyVariantValueFetch`;

export const variantValueState = (state: RootState) => state.variantValue;
