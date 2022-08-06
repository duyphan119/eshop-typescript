import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { CartItem } from "~/types/cartItem";

export interface CartState {
	loading: boolean;
	error: boolean;
	cart: {
		cartItems: CartItem[];
		count: number;
	};
}

const initialState: CartState = {
	loading: false,
	error: false,
	cart: {
		cartItems: [],
		count: 0,
	},
};

export const cartSlice = createSlice({
	name: "cart",
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
		getCart: (state, action: PayloadAction<CartItem[]>) => {
			const cartItems = action.payload;
			state.cart.cartItems = cartItems;
			state.cart.count = state.cart.cartItems.reduce(
				(prev: number, curr: CartItem) => {
					return curr.quantity + prev;
				},
				0
			);
			state.loading = false;
		},
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			state.cart.cartItems = [...state.cart.cartItems, cartItem];
			state.cart.count += cartItem.quantity;
			state.loading = false;
		},
		updateQuantity: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;

			const index = state.cart.cartItems.findIndex(
				(item: CartItem) => item.id === cartItem.id
			);

			if (index !== -1) {
				state.cart.cartItems[index] = {
					...state.cart.cartItems[index],
					...cartItem,
				};
				state.cart.count +=
					cartItem.quantity - state.cart.cartItems[index].quantity;
			}

			state.loading = false;
		},
		removeItem: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			state.cart.cartItems = state.cart.cartItems.filter(
				(item: CartItem) => item.id !== cartItem.id
			);
			state.cart.count -= cartItem.quantity;
			state.loading = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export const cartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
