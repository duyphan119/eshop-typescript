import classNames from "classnames/bind";
import config from "config";
import React from "react";
import { useLocation } from "react-router-dom";
import { formatPrice } from "utils";
import styles from "./CartResult.module.scss";
interface Props {
	originPrice: number;
	newPrice: number;
	totalPrice: number;
	onCheckout: Function;
	shippingPrice: number;
}
const cx = classNames.bind(styles);
const CartResult: React.FC<Props> = ({ shippingPrice, originPrice, newPrice, totalPrice, onCheckout }: Props) => {
	const location = useLocation();
	return (
		<div className={cx("cart-result")}>
			<div className={cx("title")}>Đơn hàng</div>
			<div className={cx("price")}>
				<span>Giá gốc</span>
				<span>{formatPrice(originPrice || 0)}₫</span>
			</div>
			<div className={cx("price", { "new-price": newPrice > 0 })}>
				<span>Giảm giá</span>
				<span>{newPrice > 0 ? `-${formatPrice(newPrice)}` : 0}₫</span>
			</div>
			{shippingPrice > 0 && (
				<div className={cx("price")}>
					<span>Vận chuyển</span>
					<span>-{formatPrice(shippingPrice)}₫</span>
				</div>
			)}
			<div className={cx("price")}>
				<span>Tổng tiền thanh toán</span>
				<span>{formatPrice(totalPrice || 0)}₫</span>
			</div>
			{location.pathname === config.routes.checkout && (
				<>
					<div className={cx("coupon")}>
						<div className={cx("coupon-title")}>Mã giảm giá</div>
						<div className={cx("coupon-input")}>
							<input placeholder="Nhập mã" />
							<button>Áp dụng</button>
						</div>
					</div>
				</>
			)}
			<button type="button" onClick={() => onCheckout()} className={cx("checkout-btn")}>
				ĐẶT HÀNG
			</button>
		</div>
	);
};
export default React.memo(CartResult);
