import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import config from "config";
import { DEFAULT_LAYOUT } from "constant";
const cx: Function = classNames.bind(styles);
const Logo: React.FC = () => {
	return (
		<Link to={config.routes.home} className={cx("logo")}>
			<img
				src="https://canifa.com/assets/images/logo.svg"
				height={DEFAULT_LAYOUT.NAV_HEIGHT / 2}
				alt=""
			/>
		</Link>
	);
};

export default React.memo(Logo);
