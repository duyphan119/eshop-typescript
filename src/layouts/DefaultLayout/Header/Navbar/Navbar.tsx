import React from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import Logo from "./Logo";
import NavCategoryList from "./NavCategoryList";
import IconList from "./IconList";
import { DEFAULT_LAYOUT } from "constant";
const cx: Function = classNames.bind(styles);
const Navbar: React.FC = () => {
	return (
		<nav className={cx("navbar")} style={{ height: DEFAULT_LAYOUT.NAV_HEIGHT }}>
			<div
				className="container"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: "100%",
				}}
			>
				<div
					className=""
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Logo />
					<NavCategoryList />
				</div>
				<div className="">
					<IconList />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
