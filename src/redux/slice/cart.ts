import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CreateCartItemPayload, DeleteManyCartItems } from "interfaces/cartItem";
import { FetchState, GetExtraPayloadType } from "interfaces/common";
import { RootState } from "redux/store";

interface CartState {
	cartItems: CartItem[];
	count: number;
}

interface StateType extends FetchState {
	cartItems: CartItem[];
	count: number;
}

const initialState: StateType = {
	cartItems: [],
	count: 0,
	isError: false,
	isLoading: false,
};
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getCartFetch: (state, action: PayloadAction<GetExtraPayloadType>) => {
			state.isError = false;
			state.isLoading = true;
		},
		getCartSuccess: (state, action: PayloadAction<CartState>) => {
			const { cartItems, count } = action.payload;
			state.cartItems = cartItems;
			state.count = count;
			state.isLoading = false;
		},
		getCartFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		addToCartFetch: (state, action: PayloadAction<CreateCartItemPayload>) => {
			state.isError = false;
			state.isLoading = true;
		},
		addToCartSuccess: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			const index = state.cartItems.findIndex((item: CartItem) => item.productOptionId === cartItem.productOptionId);
			if (index === -1) {
				state.cartItems = [...state.cartItems, cartItem];
				state.count += cartItem.quantity;
			} else {
				state.count -= state.cartItems[index].quantity;
				state.count += cartItem.quantity;
			}
			state.isLoading = false;
		},
		addToCartFailure: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
		removeItemSuccess: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			state.cartItems = state.cartItems.filter((item: CartItem) => item.productOptionId !== cartItem.productOptionId);
			state.count -= cartItem.quantity;
		},
		updateQuantitySuccess: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			const index = state.cartItems.findIndex((item: CartItem) => item.id === cartItem.id);
			if (index !== -1) {
				state.cartItems[index].quantity = cartItem.quantity;
				state.count += cartItem.quantity - state.cartItems[index].quantity;
			}
		},
		removeManyItemsSuccess: (state, action: PayloadAction<DeleteManyCartItems>) => {
			const { productOptionIds } = action.payload;
			state.cartItems = state.cartItems.filter((item: CartItem) => !productOptionIds.includes(item.productOptionId));
		},
	},
});

export const cartActions = cartSlice.actions;

export const cartState = (state: RootState) => state.cart;
