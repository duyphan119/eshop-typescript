import { Badge } from "antd";
import { getAllProductUsers } from "api/wishlistApi";
import config from "config";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { wishlistActions, wishlistState } from "redux/slice/wishlist";
interface Props {
	cx: Function;
}
const WishlistIcon: React.FC<Props> = (props: Props) => {
	const { cx } = props;

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);
	const { wishlist } = useSelector(wishlistState);
	const { count } = wishlist;

	React.useEffect(() => {
		if (accessToken) {
			(async () => {
				try {
					const res = await getAllProductUsers(accessToken, dispatch);
					const { code, data } = res.data;
					if (code === 1) {
						dispatch(wishlistActions.getWishlist(data));
					}
				} catch (error) {}
			})();
		}
	}, [dispatch, accessToken]);

	return (
		<Link to={config.routes.wishlist}>
			<Badge
				count={count}
				size="small"
				color="blue"
				className="header-badge"
				children={
					<span className={cx("icon-item")}>
						<AiOutlineHeart />
					</span>
				}
			/>
		</Link>
	);
};
export default React.memo(WishlistIcon);
