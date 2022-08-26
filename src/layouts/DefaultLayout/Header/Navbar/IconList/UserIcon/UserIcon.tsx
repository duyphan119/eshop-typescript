import { Dropdown, Menu } from "antd";
import config from "config";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "redux/slice/auth.slice";

interface Props {
	cx: Function;
}

const { profile, myOrders, wishlist, recentViewed } = config.routes;

const UserIcon: React.FC<Props> = (props: Props) => {
	const { cx } = props;

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(authActions.logoutFetch({ navigate }));
	};

	return (
		<Dropdown
			overlay={
				<Menu
					items={[
						{
							key: "1",
							label: <Link to={profile}>Profile</Link>,
						},
						{
							key: "2",
							label: <Link to={myOrders}>Orders</Link>,
						},
						{
							key: "3",
							label: <Link to={wishlist}>Wishlist</Link>,
						},
						{
							key: "4",
							label: <Link to={recentViewed}>Recent viewed</Link>,
						},
						{
							type: "divider",
						},
						{
							key: "5",
							label: <div onClick={handleLogout}>Logout</div>,
						},
					]}
				/>
			}
			placement="bottomRight"
			arrow
		>
			<span className={cx("icon-item")}>
				<AiOutlineUser />
			</span>
		</Dropdown>
	);
};

export default UserIcon;
