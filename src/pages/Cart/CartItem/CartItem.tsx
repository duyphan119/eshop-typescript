import { Tooltip } from "antd";
import { deleteManyCartItems, updateCartItem } from "api/cartItemApi";
import classNames from "classnames/bind";
import { CartItem } from "interfaces/cartItem";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { cartActions } from "redux/slice/cart.slice";
import { formatPrice, getURL } from "utils";
import styles from "./CartItem.module.scss";
const cx = classNames.bind(styles);
interface Props {
	item: CartItem;
}
const _CartItem: React.FC<Props> = (props: Props) => {
	const { item } = props;

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);

	const handleClick = async () => {
		if (accessToken) {
			try {
				await deleteManyCartItems(accessToken, dispatch, { productOptionIds: [item.productOptionId] });
			} catch (error) {}
		}
	};

	const handleChange = async (value: string) => {
		if (accessToken) {
			let newQuantity: number = 0;

			try {
				const parsedInt = parseInt("" + value);
				if (!isNaN(parsedInt)) {
					newQuantity = parsedInt;
				}

				if (newQuantity > 0) {
					const res = await updateCartItem(accessToken, dispatch, {
						productOptionId: item.productOptionId,
						quantity: newQuantity,
					});
					const { code, data } = res.data;
					if (code === 1) {
						dispatch(cartActions.updateQuantitySuccess(data));
					}
				} else {
					const res = await deleteManyCartItems(accessToken, dispatch, { productOptionIds: [item.productOptionId] });
					const { code } = res.data;
					if (code === 1) {
						dispatch(cartActions.removeManyItemsSuccess({ productOptionIds: [item.productOptionId] }));
					}
				}
			} catch (error) {}
		}
	};

	if (!(item.productOption && item.productOption.product)) return <></>;
	return (
		<tr>
			<td>
				<img src={getURL(item.productOption.thumbnail)} alt="" height={80} width={64} />
			</td>
			<td>{item.productOption.product.name}</td>
			<td>{item.productOption.title}</td>
			<td>
				<div>{formatPrice(item.productOption.product.newPrice || item.productOption.product.price)}₫</div>
				{item.productOption.product.newPrice > 0 && (
					<div
						style={{
							color: "#fdaa63",
							textDecoration: "line-through",
						}}
					>
						{formatPrice(item.productOption.product.price)}₫
					</div>
				)}
			</td>
			<td>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<div className={cx("quantity-wrapper")}>
						<div className={cx("action")} onClick={() => handleChange("" + (item.quantity - 1))}>
							-
						</div>
						<div className={cx("quantity")}>
							<input value={item.quantity} onChange={(e) => handleChange(e.target.value)} />
						</div>
						<div className={cx("action")} onClick={() => handleChange("" + (item.quantity + 1))}>
							+
						</div>
					</div>
				</div>
			</td>
			<td>{formatPrice(item.quantity * (item.productOption.product.newPrice || item.productOption.product.price))}₫</td>
			<td>
				<Tooltip ref={React.createRef()} title="Remove">
					<span className={cx("icon-delete")} onClick={handleClick}>
						<AiOutlineClose />
					</span>
				</Tooltip>
			</td>
		</tr>
	);
};

export default React.memo(_CartItem);
