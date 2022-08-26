import classNames from "classnames/bind";
import config from "config";
import { DASHBOARD_LAYOUT } from "constant";
import React from "react";
import { AiOutlineAppstore, AiOutlineBarChart, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { VscGroupByRefType } from "react-icons/vsc";
import { GiClothes } from "react-icons/gi";
import { IoOptionsSharp } from "react-icons/io5";
import { MdCategory, MdInventory2 } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import styles from "./Sidebar.module.scss";
import { SiHackthebox } from "react-icons/si";

const cx: Function = classNames.bind(styles);

export interface SidebarItem {
	text: string;
	path: string;
	icon: React.ReactElement;
	isActive: boolean;
	children?: SidebarItem[];
}

interface Props {
	width: number | string;
	isFull: boolean | undefined;
}

export interface ShowChildrenType {
	text: string | undefined;
	isShow: boolean;
}

const getItems = (pathname: string): SidebarItem[] => {
	return [
		{
			text: "Dashboard",
			path: config.routes.dashboard,
			icon: <AiOutlineAppstore />,
			isActive: config.routes.dashboard === pathname,
		},
		{
			text: "User",
			path: config.routes.userList,
			icon: <AiOutlineUser />,
			isActive: config.routes.userList === pathname,
		},
		{
			text: "Categories",
			path: config.routes.categoryList,
			icon: <MdCategory />,
			isActive: config.routes.categoryList === pathname || config.routes.newCategory === pathname,
			children: [
				{
					text: "All Category Types",
					path: config.routes.categoryTypeList,
					icon: <VscGroupByRefType />,
					isActive: config.routes.categoryTypeList === pathname,
				},
				{
					text: "All Categories",
					path: config.routes.categoryList,
					icon: <MdCategory />,
					isActive: config.routes.categoryList === pathname,
				},
				{
					text: "New Category",
					path: config.routes.newCategory,
					icon: <AiOutlinePlus />,
					isActive: config.routes.newCategory === pathname,
				},
			],
		},
		{
			text: "Variants",
			path: config.routes.variantList,
			icon: <IoOptionsSharp />,
			isActive: config.routes.variantList === pathname,
		},
		{
			text: "Products",
			path: config.routes.productList,
			icon: <GiClothes />,
			isActive: config.routes.productList === pathname || config.routes.newProduct === pathname || config.routes.productOption === pathname,
			children: [
				{
					text: "All Products",
					path: config.routes.productList,
					icon: <GiClothes />,
					isActive: config.routes.productList === pathname,
				},
				{
					text: "New Product",
					path: config.routes.newProduct,
					icon: <AiOutlinePlus />,
					isActive: config.routes.newProduct === pathname,
				},
				{
					text: "Categories",
					path: config.routes.productCategory,
					icon: <MdCategory />,
					isActive: config.routes.productCategory === pathname,
				},
				{
					text: "Options",
					path: config.routes.productOption,
					icon: <IoOptionsSharp />,
					isActive: config.routes.productOption === pathname,
				},
			],
		},
		{
			text: "Meta",
			path: config.routes.metaList,
			icon: <GiClothes />,
			isActive: config.routes.metaList === pathname || config.routes.bannerList === pathname,
			children: [
				{
					text: "All Meta",
					path: config.routes.metaList,
					icon: <TbBrandMeta />,
					isActive: config.routes.metaList === pathname,
				},
				{
					text: "All Banners",
					path: config.routes.bannerList,
					icon: <RiAdvertisementFill />,
					isActive: config.routes.bannerList === pathname,
				},
			],
		},
		{
			text: "Inventory",
			path: config.routes.inventory,
			icon: <MdInventory2 />,
			isActive: config.routes.inventory === pathname,
		},
		{
			text: "Order",
			path: config.routes.orderList,
			icon: <SiHackthebox />,
			isActive: config.routes.orderList === pathname,
		},
		{
			text: "Statistics, Report",
			path: config.routes.report,
			icon: <AiOutlineBarChart />,
			isActive: config.routes.report === pathname,
		},
	];
};

const Sidebar: React.FC<Props> = (props: Props) => {
	const { width, isFull } = props;
	const location = useLocation();

	const [items, setItems] = React.useState<SidebarItem[]>(() => getItems(location.pathname));
	const [showChildren, setShowChildren] = React.useState<ShowChildrenType>(() => {
		const activeItem = items.find((el: SidebarItem) => el.children && el.children.findIndex((ite: SidebarItem) => ite.path === location.pathname) !== -1);
		return {
			text: activeItem?.text,
			isShow: activeItem ? true : false,
		};
	});

	React.useEffect(() => {
		setItems(getItems(location.pathname));
	}, [location.pathname]);

	const handleToggle = (text: string) => {
		let isShow = showChildren.isShow;
		if (!showChildren.text) {
			isShow = true;
		} else if (showChildren.text === text) {
			isShow = !showChildren.isShow;
		}

		setShowChildren({
			text,
			isShow,
		});
	};

	return (
		<section className={cx("box")} style={{ width, top: DASHBOARD_LAYOUT.HEADER_HEIGHT }}>
			<ul className={cx("menu")}>
				{items.map((item: SidebarItem) => {
					return (
						<Item cx={cx} item={item} key={item.text} onToggle={(text: string) => handleToggle(text)} isFull={isFull} showChildren={showChildren} />
					);
				})}
			</ul>
		</section>
	);
};

export default React.memo(Sidebar);
