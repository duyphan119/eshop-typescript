import { message, Tooltip } from "antd";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { formatPrice, getToken, getURL } from "utils";
import * as cartItemApi from "~/lib/api/cartItemApi";
import { cartActions } from "~/redux/slices/cartSlice";
import { CartItem } from "~/types/cartItem";
import styles from "./styles.module.scss";

interface Props {
	item: CartItem;
}
const _CartItem: React.FC<Props> = (props: Props) => {
	const { item } = props;

	const dispatch = useDispatch();

	const token = getToken();

	const handleClick = async () => {
		if (token && item.id) {
			try {
				dispatch(cartActions.fetch());
				const res = await cartItemApi.deleteCartItem(token, item.id);
				if (res.status === 200) {
					dispatch(cartActions.removeItem(item));
					message.success("Remove cart item success");
				} else {
					dispatch(cartActions.error());
					message.success("Remove cart item fail");
				}
			} catch (error) {
				dispatch(cartActions.error());
				message.success("Remove cart item fail");
			}
		}
	};

	const handleChange = async (value: string) => {
		if (token && item.id) {
			let newQuantity: number = 0;
			try {
				const parsedInt = parseInt("" + value);
				if (!isNaN(parsedInt)) {
					newQuantity = parsedInt;
				}
			} catch (error) {}
			try {
				if (newQuantity > 0) {
					const res = await cartItemApi.updateCartItem(
						token,
						item.id,
						{
							cartId: item.cartId,
							productOptionId: item.productOptionId,
							quantity: newQuantity,
						}
					);
					if (res.status === 200) {
						dispatch(cartActions.updateQuantity(res.data));
					}
				} else if (newQuantity === 0) {
					await handleClick();
				}
			} catch (error) {}
		}
	};

	if (!(item.productOption && item.productOption.product)) return <></>;
	return (
		<tr>
			<td>
				<img
					src={getURL(item.productOption.thumbnail)}
					alt=""
					height={80}
					width={64}
				/>
			</td>
			<td>{item.productOption.product.name}</td>
			<td>{item.productOption.title}</td>
			<td>
				{formatPrice(
					item.productOption.product.newPrice ||
						item.productOption.product.price
				)}
				₫
			</td>
			<td>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<div className={styles["quantity-wrapper"]}>
						<div
							className={styles.action}
							onClick={() =>
								handleChange("" + (item.quantity - 1))
							}
						>
							-
						</div>
						<div className={styles.quantity}>
							<input
								value={item.quantity}
								readOnly={true}
								onChange={(e) => handleChange(e.target.value)}
								onBlur={(e) => handleChange(e.target.value)}
							/>
						</div>
						<div
							className={styles.action}
							onClick={() =>
								handleChange("" + (item.quantity + 1))
							}
						>
							+
						</div>
					</div>
				</div>
			</td>
			<td>
				{formatPrice(
					item.quantity *
						(item.productOption.product.newPrice ||
							item.productOption.product.price)
				)}
				₫
			</td>
			<td>
				<Tooltip ref={React.createRef()} title="Remove">
					<span
						className={styles["icon-delete"]}
						onClick={handleClick}
					>
						<AiOutlineClose />
					</span>
				</Tooltip>
			</td>
		</tr>
	);
};

export default React.memo(_CartItem);
