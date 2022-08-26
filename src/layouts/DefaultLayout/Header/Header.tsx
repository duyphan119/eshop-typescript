import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import { Affix } from "antd";

const cx: Function = classNames.bind(styles);
const Header: React.FC = () => {
	return (
		<div className={cx("header")}>
			<Affix offsetTop={0}>
				<Navbar />
			</Affix>
			<TopHeader />
		</div>
	);
};

export default React.memo(Header);
