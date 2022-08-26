import { Badge } from "antd";
import config from "config";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { cartActions, cartState } from "redux/slice/cart";
interface Props {
	cx: Function;
}
const CartIcon: React.FC<Props> = (props: Props) => {
	const { cx } = props;

	const dispatch = useDispatch();

	const { count } = useSelector(cartState);
	const { accessToken } = useSelector(authState);

	console.log({ count });

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

	return (
		<Link to={config.routes.cart}>
			<Badge
				children={
					<span className={cx("icon-item")}>
						<AiOutlineShoppingCart />
					</span>
				}
				count={count}
				size="small"
				color="blue"
				className="header-badge"
			/>
		</Link>
	);
};
export default React.memo(CartIcon);
