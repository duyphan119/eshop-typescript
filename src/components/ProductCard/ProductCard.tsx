import classNames from "classnames/bind";
import React from "react";
import styles from "./ProductCard.module.scss";
// import { Product } from "interfaces/product";
import { notification } from "antd";
import { createProductUser, deleteProductUser } from "api/wishlistApi";
import { Product } from "interfaces/product";
import { ProductUser } from "interfaces/productUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { wishlistActions, wishlistState } from "redux/slice/wishlist";
import { formatPrice } from "utils";
const cx: Function = classNames.bind(styles);

interface Props {
	product: Product;
}
const ProductCard: React.FC<Props> = (props: Props) => {
	const { product } = props;

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);
	const { wishlist } = useSelector(wishlistState);
	const { items } = wishlist;

	const [index, setIndex] = React.useState<number>(-1);

	React.useEffect(() => {
		setIndex(items.findIndex((item: ProductUser) => item.productId === product.id));
	}, [product, items]);

	const handleClickWishlistIcon = async () => {
		if (accessToken) {
			try {
				if (index !== -1) {
					const res = await deleteProductUser(accessToken, dispatch, items[index].productId);
					const { code } = res.data;
					if (code === 1) {
						dispatch(wishlistActions.removeItem(items[index].productId));
						notification.success({ message: "Sản phẩm đã bị xóa khỏi danh sách yêu thích" });
					}
				} else {
					if (product.id) {
						const res = await createProductUser(accessToken, dispatch, { productId: product.id });
						const { code, data } = res.data;
						if (code === 1) {
							dispatch(wishlistActions.addToWishlist(data));
							notification.success({ message: "Sản phẩm đã thêm vào danh sách yêu thích" });
						}
					}
				}
			} catch (error) {}
		} else {
			notification.info({ description: "Bạn vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích", message: "Thông tin" });
		}
	};

	return (
		<div
			className={cx("card", {
				active: true,
			})}
		>
			<div className={cx("tags")}>
				{/* <div className={`${cx("new")} ${cx("tag")}`}>New</div> */}
				{/* <div className={`${cx("hot")} ${cx("tag")}`}>Hot</div> */}
				{product.newPrice !== 0 && <div className={cx("sale", "tag")}>-{Math.ceil(100 - (product.newPrice * 100) / product.price)}%</div>}
			</div>
			<div className={cx("quick-actions")} onClick={handleClickWishlistIcon}>
				<span>Yêu thích</span>
				<div className={cx("action", { active: index !== -1 })}>{index !== -1 ? <AiFillHeart /> : <AiOutlineHeart />}</div>
			</div>
			<div style={{ position: "relative", overflow: "hidden" }}>
				<Link to={`/product/${product.slug}`} className={cx("img-link")}>
					<img src={product.thumbnail} style={{ width: "100%" }} alt="" />
				</Link>
				<div className={cx("quick-add-to-cart")}>Thêm vào giỏ hàng</div>
			</div>
			<div className={cx("info-wrapper", { "section-product": false })}>
				<Link to={`/product/${product.slug}`} className={`${cx("name")} three-dot three-dot-1`}>
					{product.name}
				</Link>
				<div className={cx("price")}>
					{formatPrice(product.newPrice || product.price)}₫
					{product.newPrice !== 0 && <span className={cx("old-price")}>{formatPrice(product.price)}₫</span>}
				</div>
			</div>
		</div>
	);
};

export default React.memo(ProductCard);
