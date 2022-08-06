import { memo } from "react";
import { Product } from "~/types/product";
import { formatPrice } from "~/utils";
import styles from "./styles.module.scss";

interface ProductInfoType {
	product: Product;
}

const ProductInfo: React.FC<ProductInfoType> = ({
	product,
}: ProductInfoType) => {
	return (
		<>
			<div className={styles.name}>
				<span>{product.name}</span>
			</div>
			<div className={styles.price}>
				{formatPrice(product.newPrice || product.price)}₫
				{product.newPrice !== 0 && (
					<span className={styles["old-price"]}>
						{formatPrice(product.price)}₫
					</span>
				)}
			</div>
			<hr className={styles.separate} />
			<div
				className={styles.summary + " p-m-0"}
				dangerouslySetInnerHTML={{
					__html: product ? product.summary || "" : "",
				}}
			></div>
		</>
	);
};

export default memo(ProductInfo);
