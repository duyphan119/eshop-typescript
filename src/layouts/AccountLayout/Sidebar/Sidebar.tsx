import React from "react";
import { SidebarItem } from "../AccountLayout";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { authActions } from "redux/slice/auth.slice";
import { useDispatch } from "react-redux";
interface Props {
	items: Array<SidebarItem>;
	current?: SidebarItem;
}
const cx = classNames.bind(styles);
const Sidebar: React.FC<Props> = ({ items, current }: Props) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleNavigate = (pathname: string) => {
		navigate(pathname);
	};

	const handleLogout = () => {
		dispatch(authActions.logoutFetch({ navigate }));
	};

	return (
		<div className={cx("sidebar")}>
			<ul className={cx("sidebar-items")}>
				{items.map((item: SidebarItem) => {
					return (
						<li key={item.title} className={cx({ active: item.pathname === current?.pathname })} onClick={() => handleNavigate(item.pathname)}>
							<span>{item.icon}</span>
							<span>{item.title}</span>
						</li>
					);
				})}
				<li onClick={handleLogout}>
					<span>
						<CgLogOut />
					</span>
					<span>Đăng xuất</span>
				</li>
			</ul>
		</div>
	);
};
export default React.memo(Sidebar);
