import React from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Footer from "./Footer";
const cx: Function = classNames.bind(styles);

interface Props {
	children: React.ReactElement;
}

const DefaultLayout: React.FC<Props> = (props: Props) => {
	const { children } = props;
	return (
		<>
			<Header />
			<article className={cx("main")}>{children}</article>
			<Footer />
		</>
	);
};

export default DefaultLayout;
