import { Col, Row } from "antd";

import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { cartState } from "~/redux/slices/cartSlice";
import styles from "./styles.module.scss";
import Item from "~/components/cart/CartItem";
import { CartItem } from "~/types/cartItem";
import Container from "~/components/Container";
import { DefaultLayout } from "~/layouts";
import Link from "next/link";
import config from "~/config";
import Head from "next/head";
interface Props {}
const Cart: NextPage<Props> = () => {
	const { cart } = useSelector(cartState);
	const { cartItems } = cart;

	return (
		<DefaultLayout>
			<Container>
				<section className={styles["cart"]}>
					<Head>
						<title>{config.titles.cart}</title>
					</Head>
					<Row gutter={[16, 16]}>
						<Col xs={24}>
							<span className={styles.title}>
								Giỏ hàng của bạn
							</span>
						</Col>
						<Col xs={24}>
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
										return (
											<Item item={item} key={item.id} />
										);
									})}
								</tbody>
							</table>
						</Col>
						<Col xs={24}>
							<Link href={config.routes.checkout}>
								<a>Thanh toán</a>
							</Link>
						</Col>
					</Row>
				</section>
			</Container>
		</DefaultLayout>
	);
};

export default Cart;
