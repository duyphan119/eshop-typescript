import { Button, Col, notification, Row } from "antd";
import { getAllProducts } from "api/productApi";
import classNames from "classnames/bind";
import { useTitle } from "hooks/useTitle";
import { CreateCartItem } from "interfaces/cartItem";
import { Product } from "interfaces/product";
import { ProductOption } from "interfaces/productOption";
import { ProductOptionValue } from "interfaces/productOptionValue";
import { Variant } from "interfaces/variant";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { cartActions } from "redux/slice/cart";
import Bottom from "./Bottom";
import styles from "./ProductDetail.module.scss";
import ProductInfo from "./ProductInfo";
import QuantityWrapper from "./QuantityWrapper";
import Variants from "./Variants";
interface Props {
	slug?: string;
}
const cx = classNames.bind(styles);

enum ActionKind {
	SET_PRODUCT = "SET_PRODUCT",
	SET_QUANTITY = "SET_QUANTITY",
	INIT_VARIANT = "INIT_VARIANT",
	SET_OPTION = "SET_OPTION",
}

interface Action {
	type: ActionKind;
	payload: any;
}
interface InitState {
	product: Product | null;
	variants: Array<Variant>;
	option: ProductOption | null;
	quantity: number;
	variantValues: Array<VariantValue>;
}

const initState: InitState = {
	product: null,
	variants: [],
	option: null,
	quantity: 1,
	variantValues: [],
};

const reducer = (state: InitState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		default:
			return {
				...state,
				...payload,
			};
	}
};

const ProductDetail: React.FC<Props> = (props: Props) => {
	const { slug } = useParams();

	const [{ product, variants, option, quantity }, dispatch] = React.useReducer(reducer, initState);

	const dispatchReactRedux = useDispatch();

	const { me, accessToken } = useSelector(authState);

	useTitle("product detail");

	React.useEffect(() => {
		if (slug) {
			(async () => {
				try {
					const res = await getAllProducts({
						slug,
					});
					const { code, data } = res.data;
					if (code === 1) {
						dispatch({ type: ActionKind.SET_PRODUCT, payload: { product: data.items[0] } });
					}
				} catch (error) {}
			})();
		}
	}, [slug, dispatch]);

	React.useEffect(() => {
		if (product && product.productOptions) {
			let results: Variant[] = [];
			const options = [...product.productOptions];
			const indexOption = product.productOptions.findIndex((item: ProductOption) => item.amount > 0);
			if (indexOption !== -1) {
				product.productOptions[indexOption]?.variantValues?.forEach((optionValue: ProductOptionValue) => {
					if (optionValue.variantValue && optionValue.variantValue.variant) results.push(optionValue.variantValue.variant);
				});
				options.forEach((option: ProductOption) => {
					option.variantValues?.forEach((optionValue: ProductOptionValue) => {
						results = results.map((result: Variant) => {
							if (result.id === optionValue.variantValue?.variant?.id) {
								if (optionValue.variantValue) {
									if (!result.variantValues)
										return {
											...result,
											variantValues: [optionValue.variantValue],
										};
									else if (result.variantValues?.findIndex((item: VariantValue) => item.name === optionValue.variantValue?.name) === -1) {
										return {
											...result,
											variantValues: [...result.variantValues, optionValue.variantValue],
										};
									}
								}
							}
							return result;
						});
					});
				});
				dispatch({ type: ActionKind.INIT_VARIANT, payload: { variants: results, option: product.productOptions[indexOption] } });
			}
		}
	}, [product]);

	const handleSelectVariantValue = React.useCallback(
		(variantValue: VariantValue) => {
			if (option && product && product.productOptions) {
				const __options = [...product.productOptions].filter(
					(item: ProductOption) => item.variantValues?.findIndex((ite: ProductOptionValue) => ite.variantValueId === variantValue.id) !== -1
				);
				const result = __options.find(
					(item: ProductOption) =>
						item.variantValues?.findIndex(
							(ite: ProductOptionValue) =>
								option.variantValues?.findIndex((el: ProductOptionValue) => el.variantValueId === ite.variantValueId) !== -1
						) !== -1
				);
				if (result && result.amount > 0 && result.id !== option.id) {
					dispatch({ type: ActionKind.SET_OPTION, payload: { option: result } });
				}
			}
		},
		[option, product]
	);

	const handleChangeQuantity = React.useCallback((newQuantity: string | number) => {
		try {
			const result = parseInt("" + newQuantity);
			if (!isNaN(result)) {
				if (result > 0) {
					dispatch({ type: ActionKind.SET_QUANTITY, payload: { quantity: result } });
				}
			}
		} catch (error) {}
	}, []);

	const handleAddToCart = () => {
		if (accessToken && me && me.cart && me.cart.id && option && option.id && product) {
			const cartItem: CreateCartItem = {
				productOptionId: option.id,
				quantity: quantity > option.amount ? option.amount : quantity,
			};
			dispatchReactRedux(
				cartActions.addToCartFetch({
					accessToken,
					dispatch: dispatchReactRedux,
					data: cartItem,
					onDone,
				})
			);
		}
	};

	function onDone() {
		notification.success({
			message: "Thành công",
			description: "Đã thêm sản phẩm vào giỏ hàng",
		});
	}

	if (!product) return <></>;

	return (
		<div className={cx("main") + " container"}>
			<h4>Home / Product</h4>

			<Row gutter={[24, 24]}>
				<Col xs={24} lg={16}>
					<div className={cx("thumbnail")}>
						<img src={product.thumbnail} alt="" />
					</div>
				</Col>
				<Col xs={24} lg={8}>
					<>
						<ProductInfo cx={cx} product={product} />
						<hr />
						<Variants onSelectVariantValue={handleSelectVariantValue} cx={cx} variants={variants} option={option} />

						<div className={cx("actions")}>
							<QuantityWrapper cx={cx} quantity={quantity} onChangeQuantity={handleChangeQuantity} />
							<Button className={cx("btn-add-to-cart")} onClick={handleAddToCart}>
								THÊM VÀO GIỎ HÀNG
							</Button>
							<div className={cx("icon-wishlist")}>
								<span>
									<AiOutlineHeart />
								</span>
							</div>
						</div>
					</>
				</Col>
				<Col xs={24}>
					<Bottom />
				</Col>
			</Row>
		</div>
	);
};

export default ProductDetail;
