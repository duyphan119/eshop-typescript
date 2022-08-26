import { AiOutlineBell, AiOutlineDown, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Avatar, Badge, Dropdown, Input, Menu } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import config from "config";
import { DASHBOARD_LAYOUT } from "constant";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";

interface Props {
	onClick: Function;
}

const cx: Function = classNames.bind(styles);
const menu = (
	<Menu
		items={[
			{
				label: <Link to="/">Thông tin tài khoản</Link>,
				key: "0",
			},
			{
				label: <Link to="/">Đổi mật khẩu</Link>,
				key: "1",
			},
			{
				type: "divider",
			},
			{
				label: "Đăng xuất",
				key: "3",
			},
		]}
	/>
);
const notifications = (
	<Menu
		items={[
			{
				key: "0",
				label: (
					<Link to="/" className={cx("notification")} style={{ width: DASHBOARD_LAYOUT.NOTIFICATION_WIDTH }}>
						<div className={cx("notification-title")}>Đơn hàng mới</div>
						<div className={cx("notification-time")}>12/03/2022</div>
					</Link>
				),
			},
			{
				key: "1",
				label: (
					<Link to="/" className={cx("notification")} style={{ width: DASHBOARD_LAYOUT.NOTIFICATION_WIDTH }}>
						<div className={cx("notification-title")}>Đơn hàng mới</div>
						<div className={cx("notification-time")}>12/03/2022</div>
					</Link>
				),
			},
		]}
	/>
);
const Header: React.FC<Props> = (props: Props) => {
	const { onClick } = props;
	const { me } = useSelector(authState);
	return (
		<section className={cx("box")} style={{ height: DASHBOARD_LAYOUT.HEADER_HEIGHT }}>
			<div className={cx("logo-wrapper")} style={{ width: DASHBOARD_LAYOUT.SIDEBAR_WIDTH }}>
				<Link to={config.routes.home} className={cx("logo-link")}>
					DUYP
				</Link>
				<span
					className={cx("menu-icon")}
					onClick={() => {
						onClick();
					}}
				>
					<AiOutlineMenu />
				</span>
			</div>
			<div className={cx("right")}>
				<div className={cx("search-wrapper")}>
					<Input placeholder="Search here" prefix={<AiOutlineSearch />} />
				</div>
				<div className={cx("icons")}>
					<Dropdown overlay={notifications} trigger={["click"]} placement="bottomRight">
						<div className={cx("icon")}>
							<Badge count={5} size="small">
								<AiOutlineBell />
							</Badge>
						</div>
					</Dropdown>
				</div>
				<div className={cx("account-action")}>
					{me ? (
						<Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
							<div onClick={(e) => e.preventDefault()}>
								<Avatar shape="square" src={me.avatar} alt="" />
								<span className={cx("account-fullName")}>{me.fullName}</span>
								&nbsp;
								<AiOutlineDown />
							</div>
						</Dropdown>
					) : (
						<Link to="/" className={cx("account-link")}>
							Đăng nhập / Đăng ký
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default Header;
