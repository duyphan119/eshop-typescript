import { Dropdown, Input, Menu, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Container from "~/components/Container";
import config from "~/config";
import * as cartItemApi from "~/lib/api/cartItemApi";
import { authActions, authState } from "~/redux/slices/authSlice";
import { cartActions, cartState } from "~/redux/slices/cartSlice";
import { getToken, removeToken } from "~/utils";
import Categories from "./Categories";
import styles from "./styles.module.scss";

interface Props {}
const Header: React.FC<Props> = ({}: Props) => {
	const { currentUser } = useSelector(authState);
	const { cart } = useSelector(cartState);
	const router = useRouter();

	const dispatch = useDispatch();

	React.useEffect(() => {
		const token = getToken();
		if (token) {
			(async () => {
				const res = await cartItemApi.getCartItems(token, {
					all: true,
				});
				if (res.status === 200) {
					dispatch(cartActions.getCart(res.data.items));
				}
			})();
		}
	}, []);

	const onSearch = () => {};

	const handleLogout = () => {
		removeToken();
		dispatch(authActions.getProfile(null));
		router.push(config.routes.login);
	};

	return (
		<div className={styles.header}>
			<Container style={{ height: "100%" }}>
				<div className={styles.wrapper}>
					<div className={styles.left}>
						<Link href={`/`}>
							<a className={styles["logo-link"]}>NEXT</a>
						</Link>
						<Categories />
					</div>
					<div className={styles.right}>
						<Input.Search
							placeholder="Search here..."
							onSearch={onSearch}
							style={{ width: 200, marginRight: 16 }}
						/>
						<Link href={config.routes.cart}>
							<a style={{ color: "#000", marginLeft: 16 }}>
								Giỏ hàng ({cart.count})
							</a>
						</Link>
						{currentUser ? (
							<Dropdown
								overlay={
									<Menu
										items={[
											{
												key: "1",
												label: (
													<Link
														href={
															config.routes
																.profile
														}
													>
														<a>
															Thông tin tài khoản
														</a>
													</Link>
												),
											},
											{
												key: "2",
												label: (
													<Link
														href={
															config.routes
																.myOrders
														}
													>
														<a>Đơn hàng của tôi</a>
													</Link>
												),
											},
											{
												key: "3",
												type: "divider",
											},
											{
												key: "4",
												label: (
													<Space
														onClick={handleLogout}
													>
														<AiOutlineLogout
															style={{
																transform:
																	"translateY(2px)",
																fontSize: 16,
															}}
														/>
														Đăng xuất
													</Space>
												),
											},
										]}
									/>
								}
								placement="bottomRight"
								arrow
							>
								<div
									style={{
										color: "#000",
										marginLeft: 16,
										cursor: "pointer",
									}}
								>
									{currentUser.fullName}
								</div>
							</Dropdown>
						) : (
							<React.Fragment>
								<Link href={config.routes.register}>
									<a
										style={{
											color: "#000",
											marginLeft: 16,
										}}
									>
										Đăng kí
									</a>
								</Link>
								&nbsp; |&nbsp;
								<Link href={config.routes.login}>
									<a style={{ color: "#000" }}>Đăng nhập</a>
								</Link>
							</React.Fragment>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Header;
