import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetAllResponse } from "interfaces/common";
import {
	CreateVariantPayload,
	DeleteManyVariantsPayload,
	DeleteVariantPayload,
	GetVariantQueryParams,
	UpdateVariantPayload,
	Variant,
} from "interfaces/variant";
import { RootState } from "redux/store";

interface StateType extends FetchState {
	variants: GetAllResponse<Variant>;
	currentVariant: Variant | null;
}

const initialState: StateType = {
	isLoading: false,
	isError: false,
	variants: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	currentVariant: null,
};
const name = "variant";
export const variantSlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllVariantsFetch: (state, action: PayloadAction<GetVariantQueryParams>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllVariantsSuccess: (state, action: PayloadAction<GetAllResponse<Variant>>) => {
			state.isLoading = false;
			state.variants = action.payload;
		},
		getAllVariantsFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentVariant: (state, action: PayloadAction<Variant | null>) => {
			if ((state.currentVariant && !action.payload) || (!state.currentVariant && action.payload)) {
				state.currentVariant = action.payload;
			}
		},
		createVariantFetch: (state, action: PayloadAction<CreateVariantPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createVariantSuccess: (state, action: PayloadAction<Variant>) => {
			state.isLoading = false;
			state.variants.items.unshift(action.payload);
			state.variants.count += 1;
		},
		createVariantFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateVariantFetch: (state, action: PayloadAction<UpdateVariantPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateVariantSuccess: (state, action: PayloadAction<Variant>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.variants.items.findIndex((item: Variant) => item.id === newData.id);
			if (index !== -1) {
				state.variants.items[index] = {
					...state.variants.items[index],
					...newData,
				};
			}
		},
		updateVariantFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteVariantFetch: (state, action: PayloadAction<DeleteVariantPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteVariantSuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.variants.items = state.variants.items.filter((item: Variant) => item.id !== id);
			state.variants.count -= 1;
		},
		deleteVariantFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyVariantFetch: (state, action: PayloadAction<DeleteManyVariantsPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyVariantSuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.variants.items = state.variants.items.filter((item: Variant) => !ids.includes(item.id));
			state.variants.count -= 1;
		},
		deleteManyVariantFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
	},
});

export const variantActions = variantSlice.actions;

export const getAllVariantsAction = `${name}/getAllVariantsFetch`;
export const createVariantAction = `${name}/createVariantFetch`;
export const updateVariantAction = `${name}/updateVariantFetch`;
export const deleteVariantAction = `${name}/deleteVariantFetch`;
export const deleteManyVariantAction = `${name}/deleteManyVariantFetch`;

export const variantState = (state: RootState) => state.variant;
