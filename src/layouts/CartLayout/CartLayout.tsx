import { Affix, Steps } from "antd";
import classNames from "classnames/bind";
import config from "config";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CartLayout.module.scss";

interface Props {
	children?: React.ReactNode;
}

const cx = classNames.bind(styles);

interface CartStep {
	pathname: string;
	title: string;
}

const steps: Array<CartStep> = [
	{
		pathname: config.routes.cart,
		title: "Giỏ hàng",
	},
	{
		pathname: config.routes.checkout,
		title: "Đặt hàng",
	},
	{
		pathname: config.routes.checkoutSuccess,
		title: "Hoàn tất",
	},
];

const CartLayout: React.FC<Props> = (props: Props) => {
	const { children } = props;
	const location = useLocation();
	return (
		<>
			<Affix offsetTop={0}>
				<header className={cx("header")}>
					<div className={cx("left")}>
						<Link to={config.routes.home} className={cx("logo")}>
							<img src="https://canifa.com/assets/images/logo.svg" height={48} alt="" />
						</Link>
						<span>THANH TOÁN ĐƠN HÀNG</span>
					</div>
					<div className={cx("right")}>
						<Link to={config.routes.home}>TIẾP TỤC MUA SẮM</Link>
					</div>
				</header>
			</Affix>
			<article className={cx("main") + " cart-layout container"}>
				<Steps
					current={steps.findIndex((item: CartStep) => item.pathname === location.pathname)}
					size="small"
					style={{ width: "50vw", marginInline: "auto", marginBlock: 36 }}
				>
					{steps.map((step: CartStep) => {
						return <Steps.Step key={step.title} title={step.title} />;
					})}
				</Steps>
				{children}
			</article>
		</>
	);
};
export default CartLayout;
