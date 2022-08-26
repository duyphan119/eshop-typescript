import classNames from "classnames/bind";
import React from "react";
import styles from "./TopHeader.module.scss";
const cx: Function = classNames.bind(styles);
const TopHeader: React.FC = () => {
	return <div className={cx("top-header")}>ĐỔI HÀNG MIỄN PHÍ - tại tất cả các cửa hàng</div>;
};

export default React.memo(TopHeader);
