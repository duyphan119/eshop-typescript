import { Product } from "interfaces/product";
import React from "react";
import { formatPrice } from "utils";
interface Props {
	cx: Function;
	product: Product;
}
const ProductInfo: React.FC<Props> = (props: Props) => {
	const { cx, product } = props;
	return (
		<>
			<div className={cx("name")}>
				<span>{product.name}</span>
			</div>
			<div className={cx("brand-status")}>
				Thương hiệu: <span className={cx("brand")}>Duy Fashion</span>
				<span className={cx("divider")}></span>
				Tình trạng: <span className={cx("status")}>Còn hàng</span>
			</div>
			<div className={cx("price")}>
				{formatPrice(product.newPrice || product.price)}₫
				{product.newPrice !== 0 && (
					<span className={cx("old-price")}>
						{formatPrice(product.price)}₫
					</span>
				)}
			</div>
		</>
	);
};

export default React.memo(ProductInfo);
