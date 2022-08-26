import { Col, Row } from "antd";
import classNames from "classnames/bind";
import config from "config";
import Footer from "layouts/DefaultLayout/Footer";
import Header from "layouts/DefaultLayout/Header";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { SiHackthebox } from "react-icons/si";
import { RiUserSettingsLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import styles from "./AccountLayout.module.scss";
import Sidebar from "./Sidebar";
import { useTitle } from "hooks/useTitle";

interface Props {
	children?: React.ReactNode;
}

const cx = classNames.bind(styles);

export interface SidebarItem {
	title: string;
	subTitle: string;
	icon: React.ReactNode;
	pathname: string;
}

const sidebarItems: Array<SidebarItem> = [
	{
		title: "Tài khoản",
		subTitle: "Thông tin tài khoản",
		icon: <RiUserSettingsLine />,
		pathname: config.routes.profile,
	},
	{
		title: "Yêu thích",
		subTitle: "Sản phẩm yêu thích",
		icon: <AiOutlineHeart />,
		pathname: config.routes.wishlist,
	},
	{
		title: "Đơn hàng của tôi",
		subTitle: "Đơn hàng của tôi",
		icon: <SiHackthebox />,
		pathname: config.routes.myOrders,
	},
];

const AccountLayout: React.FC<Props> = (props: Props) => {
	const { children } = props;
	useTitle("Tài khoản của tôi");
	const location = useLocation();

	const currentSidebarItem = sidebarItems.find((item: SidebarItem) => item.pathname === location.pathname);

	return (
		<>
			<Header />
			<article className={cx("main") + " container"}>
				<Row gutter={[16, 16]}>
					<Col
						xs={24}
						style={{
							fontSize: 24,
							fontWeight: 700,
							lineHeight: "29px",
						}}
					>
						{currentSidebarItem?.title}
					</Col>
					<Col xs={24} md={5}>
						<Sidebar items={sidebarItems} current={currentSidebarItem} />
					</Col>
					<Col xs={24} md={19}>
						<div
							style={{
								fontSize: 18,
								fontWeight: 700,
								lineHeight: "24px",
								marginBottom: 16,
							}}
						>
							{currentSidebarItem?.subTitle}
						</div>
						{children}
					</Col>
				</Row>
			</article>
			<Footer />
		</>
	);
};
export default AccountLayout;
