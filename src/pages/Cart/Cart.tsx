import { Col, notification, Row } from "antd";
import { createOrder } from "api/orderApi";
import classNames from "classnames/bind";
import config from "config";
import { useTitle } from "hooks/useTitle";
import { CartItem } from "interfaces/cartItem";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { cartActions, cartState } from "redux/slice/cart.slice";
import styles from "./Cart.module.scss";
import Item from "./CartItem";
import CartResult from "./CartResult";
import FormOrderInfo from "./FormOrderInfo";
import PaymentMethodRadios from "./PaymentMethodRadios";
const cx = classNames.bind(styles);

export type OrderInfoInputs = {
	fullName: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	address: string;
	description: string;
	paymentMethodId: string;
};

interface Props {}

const Cart: React.FC<Props> = () => {
	useTitle(config.titles.cart);

	const { cartItems, count } = useSelector(cartState);

	const { accessToken } = useSelector(authState);
	const [shippingPrice, setShippingPrice] = React.useState<number>(0);
	const dispatch = useDispatch();
	const location = useLocation();
	const { register, handleSubmit } = useForm<OrderInfoInputs>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<OrderInfoInputs> = async (values) => {
		if (accessToken) {
			try {
				const res = await createOrder(accessToken, dispatch, {
					address: values.address,
					city: values.city,
					district: values.district,
					fullName: values.fullName,
					phone: values.phone,
					ward: values.ward,
					totalPrice: showTotalPrice,
					shippingPrice,
					paymentMethodId: parseInt(values.paymentMethodId),
					description: values.description,
				});
				const { code, data } = res.data;
				if (code === 1) {
					notification.success({ message: "Thanh toán thành công" });
					dispatch(cartActions.checkoutSuccess(data));
					navigate(config.routes.checkoutSuccess);
				}
			} catch (error) {
				notification.error({ message: "Thanh toán thất bại" });
			}
		}
	};

	React.useEffect(() => {
		if (accessToken) {
			dispatch(
				cartActions.getCartFetch({
					accessToken,
					dispatch,
					params: { sortType: "asc" },
				})
			);
		}
	}, [accessToken, dispatch]);

	const showOriginPrice: number = React.useMemo(() => {
		return cartItems.reduce(
			(prev: number, cur: CartItem) => (cur.productOption && cur.productOption.product ? prev + cur.productOption.product.price * cur.quantity : prev),
			0
		);
	}, [cartItems]);

	const showNewPrice: number = React.useMemo(() => {
		return cartItems.reduce(
			(prev: number, cur: CartItem) =>
				cur.productOption && cur.productOption.product && cur.productOption.product.newPrice > 0
					? prev + (cur.productOption.product.price - cur.productOption.product.newPrice) * cur.quantity
					: prev,
			0
		);
	}, [cartItems]);

	const showTotalPrice: number = React.useMemo(() => {
		const totalPrice =
			cartItems.reduce(
				(prev: number, cur: CartItem) =>
					cur.productOption && cur.productOption.product
						? prev + (cur.productOption.product.newPrice || cur.productOption.product.price) * cur.quantity
						: prev,
				0
			) - shippingPrice;
		return totalPrice > 0 ? totalPrice : 0;
	}, [cartItems, shippingPrice]);

	const handleCheckout = async () => {
		if (location.pathname === config.routes.cart) {
			navigate(config.routes.checkout);
		}
	};

	const handleGetFee = (fee: number) => {
		setShippingPrice(fee);
	};

	if (location.pathname === config.routes.checkout && cartItems.length === 0) return <Navigate to={config.routes.cart} />;

	return (
		<section className={cx("cart")}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row gutter={[16, 16]} style={{ alignItems: "stretch" }}>
					<Col xs={24} lg={17}>
						<div className={cx("left")}>
							<Row gutter={[16, 16]}>
								{location.pathname === config.routes.checkout && (
									<>
										<Col xs={24} lg={12}>
											<div className={cx("title")}>Thông tin giao hàng</div>
											<FormOrderInfo register={register} onGetFee={(value: number) => handleGetFee(value)} />
										</Col>
										<Col xs={24}>
											<div className={cx("title")}>Phương thức giao hàng</div>
											<PaymentMethodRadios register={register} />
										</Col>
									</>
								)}
								<Col xs={24}>
									<div className={cx("title")}>{location.pathname === config.routes.cart ? `(${count}) Sản phẩm` : "Giỏ hàng"}</div>
									<table>
										<thead>
											<tr>
												<th>Thumbnail</th>
												<th>Name</th>
												<th>Option</th>
												<th>Price Each</th>
												<th>Quantity</th>
												<th>Total</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{cartItems.map((item: CartItem) => {
												return <Item item={item} key={item.productOptionId} />;
											})}
										</tbody>
									</table>
								</Col>
							</Row>
						</div>
					</Col>
					<Col xs={24} lg={7}>
						<CartResult
							originPrice={showOriginPrice}
							shippingPrice={shippingPrice}
							newPrice={showNewPrice}
							totalPrice={showTotalPrice}
							onCheckout={handleCheckout}
						/>
					</Col>
				</Row>
			</form>
		</section>
	);
};

export default Cart;
