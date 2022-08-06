export interface RoutesType {
	home: string;
	dashboard: string;
	report: string;
	categoryList: string;
	productList: string;
	login: string;
	register: string;
	cart: string;
	newProduct: string;
	productOption: string;
	newCategory: string;
	notFound: string;
	productCategory: string;
	variantList: string;
	inventory: string;
	productSearch: string;
	productDetail: string;
	wishlist: string;
	profile: string;
	myOrders: string;
	recentViewed: string;
	metaList: string;
	bannerList: string;
	slug: string;
	categoryTypeList: string;
	checkout: string;
}

export const routes: RoutesType = {
	home: "/",
	dashboard: "/dashboard",
	report: "/report",
	categoryList: "/dashboard/category",
	productList: "/dashboard/product",
	login: "/login",
	register: "/register",
	cart: "/cart",
	productDetail: "/product/:slug",
	newProduct: "/dashboard/product/new",
	productOption: "/dashboard/product/option",
	newCategory: "/dashboard/category/new",
	productCategory: "/dashboard/product/category",
	variantList: "/dashboard/variant",
	inventory: "/dashboard/product/inventory",
	notFound: "*",
	productSearch: "/search",
	wishlist: "/wishlist",
	profile: "/account/profile",
	myOrders: "/account/orders",
	recentViewed: "/account/recent-viewed",
	metaList: "/dashboard/meta",
	bannerList: "/dashboard/banner",
	slug: "/:slug",
	categoryTypeList: "/dashboard/category-type",
	checkout: "/checkout",
};
