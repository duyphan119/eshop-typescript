import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductUser } from "interfaces/productUser";
import { RootState } from "redux/store";

interface WishlistState {
	items: ProductUser[];
	totalPage: number;
	count: number;
}

interface StateType {
	wishlist: WishlistState;
}

const initialState: StateType = {
	wishlist: {
		items: [],
		totalPage: 0,
		count: 0,
	},
};
export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		getWishlist: (state, action: PayloadAction<WishlistState>) => {
			const { items, count } = action.payload;
			state.wishlist.items = items;
			state.wishlist.count = count;
		},
		addToWishlist: (state, action: PayloadAction<ProductUser>) => {
			state.wishlist.items = [action.payload, ...state.wishlist.items];
			state.wishlist.count += 1;
		},
		removeItem: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			state.wishlist.items = state.wishlist.items.filter((item: ProductUser) => item.productId !== productId);
			state.wishlist.count -= 1;
		},
	},
});

export const wishlistActions = wishlistSlice.actions;

export const wishlistState = (state: RootState) => state.wishlist;
