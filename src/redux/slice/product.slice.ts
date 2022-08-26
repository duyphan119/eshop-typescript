import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, GetAllResponse } from "interfaces/common";
import {
	CreateProductPayload,
	DeleteManyProductsPayload,
	DeleteProductPayload,
	GetProductQueryParams,
	Product,
	UpdateProductPayload,
} from "interfaces/product";
import { RootState } from "redux/store";

export interface HomePage extends FetchState {
	list: Product[];
}
export interface ProductList extends FetchState {
	list: Product[];
	current?: Product;
}
export interface ProductCategory {
	list: Product[];
}
export interface ProductOption extends FetchState {
	list: Product[];
	selectedList: Product[];
}

export interface ProductDetailPage extends FetchState {
	item: Product | null;
}

export interface PreviewSearchResults extends FetchState {
	list: Product[];
}

export interface ProductsPage extends FetchState {
	list: Product[];
	totalResult: number;
	totalPage: number;
}

interface StateType {
	list: Product[];
	listSearch: Product[];
	isLoading: boolean;
	isError: boolean;
	isLoadingForm: boolean;
	isLoadingDelete: boolean;
	isLoadingSearch: boolean;
	current: Product | null;
	homePage: GetAllResponse<Product>;
	productList: ProductList;
	productDetailPage: ProductDetailPage;
	productCategory: ProductCategory;
	productOption: ProductOption;
	previewSearchResults: PreviewSearchResults;
	productsPage: ProductsPage;
	products: GetAllResponse<Product>;
	currentProduct: Product | null;
}

const initialState: StateType = {
	list: [],
	listSearch: [],
	isLoading: false,
	isError: false,
	isLoadingForm: false,
	isLoadingDelete: false,
	isLoadingSearch: false,
	current: null,
	currentProduct: null,
	homePage: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	productDetailPage: {
		item: null,
		isLoading: false,
		isError: false,
	},
	productList: {
		list: [],
		isLoading: false,
		isError: false,
	},
	productCategory: {
		list: [],
	},
	productOption: {
		list: [],
		isLoading: false,
		isError: false,
		selectedList: [],
	},
	previewSearchResults: {
		list: [],
		isLoading: false,
		isError: false,
	},
	productsPage: {
		list: [],
		isLoading: false,
		isError: false,
		totalResult: 0,
		totalPage: 0,
	},
	products: {
		items: [],
		count: 0,
		totalPage: 0,
	},
};
const name = "product";
export const productSlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllProductsFetch: (state, action: PayloadAction<GetProductQueryParams>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllProductsSuccess: (state, action: PayloadAction<GetAllResponse<Product>>) => {
			state.isLoading = false;
			state.products = action.payload;
		},
		getAllProductsFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentCategory: (state, action: PayloadAction<Product | null>) => {
			if ((state.currentProduct && !action.payload) || (!state.currentProduct && action.payload)) {
				state.currentProduct = action.payload;
			}
		},
		createCategoryFetch: (state, action: PayloadAction<CreateProductPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createProductSuccess: (state, action: PayloadAction<Product>) => {
			state.isLoading = false;
			state.products.items.unshift(action.payload);
			state.products.count += 1;
		},
		createProductFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateProductFetch: (state, action: PayloadAction<UpdateProductPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateProductSuccess: (state, action: PayloadAction<Product>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.products.items.findIndex((item: Product) => item.id === newData.id);
			if (index !== -1) {
				state.products.items[index] = {
					...state.products.items[index],
					...newData,
				};
			}
		},
		updateProductFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteProductFetch: (state, action: PayloadAction<DeleteProductPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteProductSuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.products.items = state.products.items.filter((item: Product) => item.id !== id);
			state.products.count -= 1;
		},
		deleteProductFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyProductsFetch: (state, action: PayloadAction<DeleteManyProductsPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyProductsSuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.products.items = state.products.items.filter((item: Product) => !ids.includes(item.id));
			state.products.count -= 1;
		},
		deleteManyProductsFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},

		getProductListFetch: (state, action: any) => {},
		getProductListSuccess: (state, action: any) => {},
		getProductListFailure: (state) => {},
		getCurrentProduct: (state, action: any) => {},
		addProductFetch: (state, action: any) => {},
		addProductSuccess: (state, action: any) => {},
		addProductFailure: (state) => {},
		searchProductFetch: (state, action: any) => {},
		searchProductSuccess: (state, action: any) => {},
		searchProductFailure: (state) => {},
		getProductListHomePageFetch: (state, action: any) => {},
		getProductListHomePageSuccess: (state, action: any) => {},
		getProductListHomePageFailure: (state) => {},
		getProductListProductOptionFetch: (state, action: any) => {},
		getProductListProductOptionSuccess: (state, action: any) => {},
		getProductListProductOptionFailure: (state) => {},
		getSelectedListProductOption: (state, action: any) => {},
		getProductDetailPageFetch: (state, action: any) => {},
		getProductDetailPageSuccess: (state, action: any) => {},
		getProductDetailPageFailure: (state) => {},
		getPreviewSearchResultsFetch: (state, action: any) => {},
		getPreviewSearchResultsSuccess: (state, action: any) => {},
		getPreviewSearchResultsFailure: (state) => {},
		getProductsPageFetch: (state, action: any) => {},
		getProductsPageSuccess: (state, action: any) => {},
		getProductsPageFailure: (state) => {},
	},
});

export const productActions = productSlice.actions;

export const getAllProductsAction = `${name}/getAllProductsFetch`;
export const createProductAction = `${name}/createProductFetch`;
export const updateProductAction = `${name}/updateProductFetch`;
export const deleteProductAction = `${name}/deleteProductFetch`;
export const deleteManyProductsAction = `${name}/deleteManyProductsFetch`;

export const productState = (state: RootState) => state.product;
