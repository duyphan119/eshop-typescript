import classNames from "classnames/bind";
import React from "react";
import CartIcon from "./CartIcon";
import styles from "./IconList.module.scss";
import SearchIcon from "./SearchIcon";
import SearchWrapper from "./SearchWrapper";
import UserIcon from "./UserIcon";
import WishlistIcon from "./WishlistIcon";
const cx: Function = classNames.bind(styles);
const IconList: React.FC = () => {
	return (
		<div className={cx("icon-list")}>
			<SearchWrapper cx={cx} />
			<UserIcon cx={cx} />
			<WishlistIcon cx={cx} />
			<CartIcon cx={cx} />
		</div>
	);
};

export default React.memo(IconList);
