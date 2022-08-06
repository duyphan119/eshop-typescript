import { Button, Col, message, notification, Row } from "antd";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import * as productApi from "~/lib/api/productApi";
import { Product } from "~/types/product";
import { ProductOption } from "~/types/productOption";
import { Variant } from "~/types/variant";
import { VariantValue } from "~/types/variantValue";
import { getToken, getURL } from "~/utils";
import styles from "./[productSlug].module.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { DefaultLayout } from "~/layouts";
import Container from "~/components/Container";
import ProductInfo from "~/components/product/ProductInfo";
import Variants from "~/components/product/Variants";
import QuantityWrapper from "~/components/product/QuantityWrapper";
import Bottom from "~/components/product/Bottom";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "~/redux/slices/authSlice";
import { CartItem } from "~/types/cartItem";
import { cartActions, cartState } from "~/redux/slices/cartSlice";
import * as cartItemApi from "~/lib/api/cartItemApi";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
	product: Product;
}

const ProductSlug: NextPage<Props> = ({ product }: Props) => {
	const { currentUser } = useSelector(authState);
	const { loading } = useSelector(cartState);
	const router = useRouter();
	console.log(router);

	const dispatch = useDispatch();

	const [variants, setVariants] = useState<Variant[]>([]);
	const [option, setOption] = useState<ProductOption>();
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		if (product && product.productOptions) {
			let results: Variant[] = [];
			const options = [...product.productOptions];
			const indexOption = product.productOptions.findIndex(
				(item: ProductOption) => item.amount > 0
			);
			if (indexOption !== -1) {
				// Tạo mảng variant
				product.productOptions[indexOption]?.variantValues?.forEach(
					(variantValue: VariantValue) => {
						variantValue.variant &&
							results.push(variantValue.variant);
					}
				);
				// Map qua từng option
				options.forEach((option: ProductOption) => {
					option.variantValues?.forEach(
						(variantValue: VariantValue) => {
							console.log(variantValue.name);
							results = results.map((result: Variant) => {
								if (result.id === variantValue?.variant?.id) {
									if (variantValue) {
										if (!result.variantValues)
											return {
												...result,
												variantValues: [variantValue],
											};
										else if (
											result.variantValues?.findIndex(
												(item: VariantValue) =>
													item.name ===
													variantValue?.name
											) === -1
										) {
											return {
												...result,
												variantValues: [
													...result.variantValues,
													variantValue,
												],
											};
										}
									}
								}
								return result;
							});
						}
					);
				});
				setVariants(results);
				setOption(product.productOptions[indexOption]);
			}
		}
	}, [product]);

	const handleSelectVariantValue = useCallback(
		(variantValue: VariantValue) => {
			if (option && product.productOptions) {
				const __options = [...product.productOptions].filter(
					(item: ProductOption) =>
						item.variantValues?.findIndex(
							(ite: VariantValue) => ite.id === variantValue.id
						) !== -1
				);
				const result = __options.find(
					(item: ProductOption) =>
						item.variantValues?.findIndex(
							(ite: VariantValue) =>
								option.variantValues?.findIndex(
									(el: VariantValue) => el.id === ite.id
								) !== -1
						) !== -1
				);
				if (result && result.amount > 0 && result.id !== option.id) {
					setOption(result);
				}
			}
		},
		[option, product]
	);

	const handleChangeQuantity = useCallback((newQuantity: string | number) => {
		try {
			const result = parseInt("" + newQuantity);
			if (!isNaN(result)) {
				if (result > 0) {
					setQuantity(result);
				}
			}
		} catch (error) {}
	}, []);

	const [api, contextHolder] = notification.useNotification();

	// const addToCartSuccess = () => {
	// 	message.success("Add to cart success");
	// };

	const handleAddToCart = async () => {
		const token = getToken();
		try {
			dispatch(cartActions.fetch());
			console.log({
				currentUser,
				isAdmin: currentUser?.isAdmin,
				option,
				optionId: option?.id,
				product,
				cart: currentUser?.cart,
				cartId: currentUser?.cart?.id,
				token,
			});
			if (
				currentUser &&
				!currentUser.isAdmin &&
				option &&
				option.id &&
				product &&
				currentUser.cart &&
				currentUser.cart.id &&
				token
			) {
				const cartItem: CartItem = {
					cartId: currentUser.cart.id,
					productOptionId: option.id,
					quantity:
						quantity > option.amount ? option.amount : quantity,
					productOption: {
						...option,
						product,
					},
				};
				const res = await cartItemApi.createCartItem(token, cartItem);
				if (res.status === 201) {
					console.log(cartItem);
					dispatch(cartActions.addToCart(res.data));
					api.success({
						message: `Success`,
						description: "Add to cart successfully",
						placement: "topRight",
					});
				} else {
					dispatch(cartActions.error());
					api.error({
						message: `Error`,
						description: "Add to cart failure",
						placement: "topRight",
					});
				}
			} else {
				dispatch(cartActions.error());
				api.error({
					message: `Error`,
					description: "Add to cart failure",
					placement: "topRight",
				});
			}
		} catch (error) {
			console.log(error);
			dispatch(cartActions.error());
			api.error({
				message: `Error`,
				description: "Add to cart failure",
				placement: "topRight",
			});
		}
	};

	if (!product) return <></>;

	return (
		<DefaultLayout>
			<Container>
				<div className={styles.main}>
					{contextHolder}
					<Head>
						<title>{product.name}</title>
					</Head>
					<h4>Home / Product</h4>
					<Row gutter={[24, 24]}>
						<Col xs={24} lg={16}>
							<Row gutter={[24, 24]}>
								<Col xs={24} lg={10}>
									<div className={styles.thumbnail}>
										<img
											src={getURL(product?.thumbnail)}
											alt=""
										/>
									</div>
								</Col>
								<Col xs={24} lg={14}>
									<>
										<ProductInfo product={product} />

										<Variants
											onSelectVariantValue={
												handleSelectVariantValue
											}
											variants={variants}
											option={option}
										/>

										<div className={styles.actions}>
											<QuantityWrapper
												quantity={quantity}
												onChangeQuantity={
													handleChangeQuantity
												}
											/>
											{option && option.amount > 0 && (
												<Button
													className={
														styles[
															"btn-add-to-cart"
														]
													}
													onClick={handleAddToCart}
													loading={loading}
												>
													ADD TO CART
												</Button>
											)}
											<div
												className={
													styles["icon-wishlist"]
												}
											>
												<span>
													<AiOutlineHeart />
												</span>
											</div>
										</div>
									</>
								</Col>
								<Col xs={24}>
									{product.id && (
										<Bottom productId={product.id} />
									)}
								</Col>
							</Row>
						</Col>
						<Col xs={24} lg={8}>
							Danh mục
						</Col>
					</Row>
				</div>
			</Container>
		</DefaultLayout>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const res = await productApi.getProducts({
		slug: params.productSlug,
	});

	if (res && res.data && res.data.items && res.data.items.length > 0)
		return {
			props: {
				product: res.data.items[0],
			},
		};
	return {
		props: {},
		notFound: true,
	};
};

export default ProductSlug;
