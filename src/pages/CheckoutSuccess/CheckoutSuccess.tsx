import config from "config";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { cartState } from "redux/slice/cart.slice";
interface Props {}
const CheckoutSuccess: React.FC<Props> = (props: Props) => {
	const { order } = useSelector(cartState);
	if (!order) return <Navigate to={config.routes.cart} />;
	return (
		<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
			<div>Cảm ơn bạn đã đặt hàng</div>
			<div>
				Đơn hàng của bạn có mã: <b>{order.id}</b>
			</div>
			<div>Đơn hàng của bạn đang được xử lý.</div>
			<div>Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng.</div>
			<Link
				to={config.routes.home}
				style={{
					backgroundColor: "#333a48",
					color: "#fff",
					display: "block",
					padding: "12px 60px",
					textTransform: "uppercase",
				}}
			>
				Tiếp tục mua hàng
			</Link>
		</div>
	);
};
export default CheckoutSuccess;
