import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "~/types/product";
import { formatPrice, getURL } from "~/utils";
import styles from "./styles.module.scss";

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
	return (
		<div className={styles["card"]}>
			<Link href={`/product/${product.slug}`}>
				<a className={styles["img-link"]}>
					<Image
						loader={({ src }) => src}
						src={getURL(product.thumbnail)}
						alt="Picture of the author"
						unoptimized={true}
						layout="fill"
						objectFit="cover"
					/>
				</a>
			</Link>
			<Link href={`/product/${product.slug}`}>
				<a className={styles["name-link"] + " three-dot three-dot-2"}>
					{product.name}
				</a>
			</Link>
			<div className={styles["price"]}>{formatPrice(product.price)}đ</div>
		</div>
	);
};

export default React.memo(ProductCard);
