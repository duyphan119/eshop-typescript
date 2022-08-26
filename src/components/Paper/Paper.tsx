import React from "react";
import classNames from "classnames/bind";
import styles from "./Paper.module.scss";

interface Props {
	children?: React.ReactNode;
	style?: React.CSSProperties;
}
const cx = classNames.bind(styles);
const Paper: React.FC<Props> = (props: Props) => {
	const { children, style } = props;
	return (
		<div className={cx("paper")} style={style}>
			{children}
		</div>
	);
};

export default Paper;
