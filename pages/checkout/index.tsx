import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "~/components/Container";
import config from "~/config";
import * as cartItemApi from "~/lib/api/cartItemApi";
import * as orderApi from "~/lib/api/orderApi";
import * as otherApi from "~/lib/api/otherApi";
import { cartActions, cartState } from "~/redux/slices/cartSlice";
import { orderActions, orderState } from "~/redux/slices/orderSlice";
import { CartItem } from "~/types/cartItem";
import { City, District, Ward } from "~/types/common";
import { formatPrice, getToken, getURL } from "~/utils";
import styles from "./styles.module.scss";
type InitialValuesType = {
	fullName: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	address: string;
	description: string;
};

const Checkout: NextPage = () => {
	const [form] = Form.useForm();
	const router = useRouter();
	const { cart } = useSelector(cartState);
	const { loading } = useSelector(orderState);
	const [cities, setCities] = React.useState<Array<City>>([]);
	const [districts, setDistricts] = React.useState<Array<District>>([]);
	const [wards, setWards] = React.useState<Array<Ward>>([]);
	const dispatch = useDispatch();
	const token = getToken();

	console.log({ cart });

	React.useEffect(() => {
		if (token) {
			(async () => {
				const res = await Promise.allSettled([
					otherApi.getProvincesVN(),
					cartItemApi.getCartItems(token, { all: true }),
				]);
				if (res[0].status === "fulfilled") {
					setCities(res[0].value.data);
				}
				if (res[1].status === "fulfilled") {
					dispatch(cartActions.getCart(res[1].value.data.items));
				}
			})();
		} else {
			router.push(config.routes.home);
		}
	}, []);

	const tempPrice = React.useMemo(() => {
		return cart.cartItems.reduce(
			(prev: number, curr: CartItem) =>
				prev +
				curr.quantity *
					(curr.productOption?.product?.newPrice ||
						curr.productOption?.product?.price ||
						0),
			0
		);
	}, [cart.cartItems]);

	const handleSubmit = async (values: InitialValuesType) => {
		console.log(values);
		if (token) {
			try {
				dispatch(orderActions.fetch());
				const res = await orderApi.createOrder(token, {
					...values,
					orderItems: cart.cartItems.map((item: CartItem) => ({
						productOptionId: item.productOptionId,
						quantity: item.quantity,
						price:
							item.productOption?.product?.newPrice ||
							item.productOption?.product?.price ||
							0,
					})),
					totalPrice: tempPrice - 22000,
				});
				if (res.status === 201) {
					dispatch(orderActions.createOrder(res.data));
					dispatch(cartActions.getCart([]));
					router.push(config.routes.home);
				}
			} catch (error) {
				dispatch(orderActions.error());
			}
		}
	};

	return (
		<Container>
			<Form
				form={form}
				initialValues={
					{
						fullName: "",
						phone: "",
						city: "",
						district: "",
						ward: "",
						address: "",
						description: "",
					} as InitialValuesType
				}
				onFinish={handleSubmit}
				className={styles.form}
			>
				<Head>
					<title>{config.titles.checkout}</title>
				</Head>
				<Row gutter={[16, 16]} className={styles.wrapper}>
					<Col xs={12} lg={8}>
						<h1>Thông tin khách hàng</h1>
						<Form.Item
							name="fullName"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
							]}
						>
							<Input placeholder="Nhập tên người đặt" />
						</Form.Item>
						<Form.Item
							name="phone"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
								{
									pattern:
										/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
									message: "Phone is invalid",
								},
							]}
						>
							<Input placeholder="Nhập số điện thoại" />
						</Form.Item>
						<Form.Item
							name="city"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
							]}
						>
							<Select
								onChange={(value) =>
									setDistricts(
										[...cities].filter(
											(item: City) => item.name === value
										)[0].districts || []
									)
								}
							>
								<Select.Option value="">
									Chọn Tỉnh / Thành phố
								</Select.Option>
								{cities.map((item: City) => {
									return (
										<Select.Option
											key={item.name}
											value={item.name}
										>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							name="district"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
							]}
						>
							<Select
								onChange={(value) =>
									setWards(
										[...districts].filter(
											(item: District) =>
												item.name === value
										)[0].wards || []
									)
								}
							>
								<Select.Option value="">
									Chọn Quận / Huyện
								</Select.Option>
								{districts.map((item: District) => {
									return (
										<Select.Option
											key={item.name}
											value={item.name}
										>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							name="ward"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
							]}
						>
							<Select>
								<Select.Option value="">
									Chọn Phường / Xã
								</Select.Option>
								{wards.map((item: District) => {
									return (
										<Select.Option
											key={item.name}
											value={item.name}
										>
											{item.name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							name="address"
							rules={[
								{
									message: "This field is required",
									required: true,
								},
							]}
						>
							<Input placeholder="Nhập số nhà, tên đường" />
						</Form.Item>
						<Form.Item name="description">
							<Input.TextArea placeholder="Ghi chú" />
						</Form.Item>
					</Col>
					<Col
						xs={12}
						lg={8}
						style={{
							borderLeft: "1px solid #000",
							borderRight: "1px solid #000",
						}}
					>
						<h1>Phương phức thanh toán</h1>
					</Col>

					<Col xs={24} lg={8}>
						<h1>Thông tin đơn hàng</h1>
						{cart.cartItems.map(
							(cartItem: CartItem, index: number) => {
								return (
									<Space
										key={cartItem.id || index}
										style={{ marginTop: index ? 16 : 0 }}
									>
										<Image
											loader={({ src }) => getURL(src)}
											src={
												cartItem.productOption
													?.thumbnail || ""
											}
											alt=""
											width={56}
											height={72}
										/>
										<Space
											direction="vertical"
											className={styles["cart-item-info"]}
										>
											<span
												className={
													styles[
														"cart-item-product-name"
													]
												}
											>
												{
													cartItem.productOption
														?.product?.name
												}
											</span>
											<span
												className={
													styles[
														"cart-item-option-title"
													]
												}
											>
												{cartItem.productOption?.title}
											</span>
											<Space>
												<span
													className={
														styles[
															"cart-item-quantity"
														]
													}
												>
													SL:{" "}
													<strong>
														{cartItem.quantity}
													</strong>
												</span>
												<span
													className={
														styles[
															"cart-item-product-price"
														]
													}
												>
													{formatPrice(
														cartItem.productOption
															?.product
															?.newPrice ||
															cartItem
																.productOption
																?.product?.price
													)}
													đ
												</span>
											</Space>
										</Space>
									</Space>
								);
							}
						)}
						<ul className={styles["price-result-list"]}>
							<li>
								<span>Tạm tính</span>
								<span>{formatPrice(tempPrice)}đ</span>
							</li>
							<li>
								<span>Vận chuyển</span>
								<span>{formatPrice(22000)}đ</span>
							</li>
							<li>
								<span>Tổng cộng</span>
								<span>{formatPrice(tempPrice - 22000)}đ</span>
							</li>
						</ul>
						<Space>
							<Link href={config.routes.cart}>
								<a>Quan về giỏ hàng</a>
							</Link>
							<Button
								type="primary"
								onClick={form.submit}
								loading={loading}
							>
								Thanh toán
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default Checkout;
