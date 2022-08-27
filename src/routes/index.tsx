import React from "react";
import config from "config";
import { AccountLayout, CartLayout, DashboardLayout, DefaultLayout, OnlyContentLayout } from "layouts";

const Home = React.lazy(() => import("pages/Home"));
const VariantList = React.lazy(() => import("pages/VariantList"));
const CategoryList = React.lazy(() => import("pages/CategoryList"));
const UserList = React.lazy(() => import("pages/UserList"));
const NotFound = React.lazy(() => import("pages/NotFound"));
const ProductList = React.lazy(() => import("pages/ProductList"));
const Login = React.lazy(() => import("pages/Login"));
const Register = React.lazy(() => import("pages/Register"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Cart = React.lazy(() => import("pages/Cart"));
const NewProductPage = React.lazy(() => import("pages/NewProductPage"));
const ProductOption = React.lazy(() => import("pages/ProductOption"));
const NewCategoryPage = React.lazy(() => import("pages/NewCategoryPage"));
const Inventory = React.lazy(() => import("pages/Inventory"));
const SearchProductPage = React.lazy(() => import("pages/SearchProductPage"));
const Wishlist = React.lazy(() => import("pages/Wishlist"));
const ProductCategoryPage = React.lazy(() => import("pages/ProductCategoryPage"));
const ProductDetail = React.lazy(() => import("pages/ProductDetail"));
const MetaList = React.lazy(() => import("pages/MetaList"));
const BannerList = React.lazy(() => import("pages/BannerList"));
const Slug = React.lazy(() => import("pages/Slug"));
const CategoryTypeList = React.lazy(() => import("pages/CategoryTypeList"));
const OrderList = React.lazy(() => import("pages/OrderList"));
const MyOrders = React.lazy(() => import("pages/MyOrders"));
const Profile = React.lazy(() => import("pages/Profile"));
const EditOrder = React.lazy(() => import("pages/EditOrder"));
const CheckoutSuccess = React.lazy(() => import("pages/CheckoutSuccess"));

export interface RouteType {
	path: string;
	element: React.FC<any>;
	layout: React.FC<any>;
}

export const privateRoutes: RouteType[] = [
	{
		path: config.routes.dashboard,
		element: Dashboard,
		layout: DashboardLayout,
	},
	{
		path: config.routes.userList,
		element: UserList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.categoryList,
		element: CategoryList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.productList,
		element: ProductList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.editOrder,
		element: EditOrder,
		layout: DashboardLayout,
	},
	{
		path: config.routes.newProduct,
		element: NewProductPage,
		layout: DashboardLayout,
	},
	{
		path: config.routes.newCategory,
		element: NewCategoryPage,
		layout: DashboardLayout,
	},
	{
		path: config.routes.updateCategory,
		element: NewCategoryPage,
		layout: DashboardLayout,
	},
	{
		path: config.routes.productCategory,
		element: ProductCategoryPage,
		layout: DashboardLayout,
	},
	{
		path: config.routes.variantList,
		element: VariantList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.productOption,
		element: ProductOption,
		layout: DashboardLayout,
	},
	{
		path: config.routes.inventory,
		element: Inventory,
		layout: DashboardLayout,
	},
	{
		path: config.routes.metaList,
		element: MetaList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.bannerList,
		element: BannerList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.orderList,
		element: OrderList,
		layout: DashboardLayout,
	},
	{
		path: config.routes.categoryTypeList,
		element: CategoryTypeList,
		layout: DashboardLayout,
	},
];

export const publicRoutes: RouteType[] = [
	{
		path: config.routes.home,
		element: Home,
		layout: DefaultLayout,
	},
	{
		path: config.routes.cart,
		element: Cart,
		layout: CartLayout,
	},
	{
		path: config.routes.checkout,
		element: Cart,
		layout: CartLayout,
	},
	{
		path: config.routes.checkoutSuccess,
		element: CheckoutSuccess,
		layout: CartLayout,
	},
	{
		path: config.routes.notFound,
		element: NotFound,
		layout: DefaultLayout,
	},
	{
		path: config.routes.productDetail,
		element: ProductDetail,
		layout: DefaultLayout,
	},
	{
		path: config.routes.productSearch,
		element: SearchProductPage,
		layout: DefaultLayout,
	},
	{
		path: config.routes.wishlist,
		element: Wishlist,
		layout: AccountLayout,
	},
	{
		path: config.routes.slug,
		element: Slug,
		layout: OnlyContentLayout,
	},
	{
		path: config.routes.login,
		element: Login,
		layout: OnlyContentLayout,
	},
	{
		path: config.routes.register,
		element: Register,
		layout: OnlyContentLayout,
	},
	{
		path: config.routes.myOrders,
		element: MyOrders,
		layout: AccountLayout,
	},
	{
		path: config.routes.wishlist,
		element: Wishlist,
		layout: AccountLayout,
	},
	{
		path: config.routes.profile,
		element: Profile,
		layout: AccountLayout,
	},
];
