import React from "react";
import classNames from "classnames/bind";
import styles from "./SectionNewProducts.module.scss";
import { Col, Row } from "antd";
import ProductCard from "components/ProductCard";
interface Props {}
const cx = classNames.bind(styles);
const _product = {
	name: "Bộ mặc nhà bé trai",
	price: 329000,
	newPrice: 249000,
	thumbnail: "https://canifa.com/img/486/733/resize/2/l/2ls22s018-sy038-2-thumb.jpg",
	id: 1,
	slug: "/",
} as any;
const SectionNewProducts: React.FC<Props> = (props: Props) => {
	const [categories, setCategories] = React.useState<any>([
		{
			title: "Sản phẩm mới",
			id: "1",
		},
		{
			title: "Áo phông",
			id: "2",
		},
		{
			title: "Váy mẹ và bé",
			id: "3",
		},
		{
			title: "Quần shorts",
			id: "4",
		},
	]);
	const [indexTab, setIndexTab] = React.useState<any>(0);
	return (
		<section style={{ marginTop: 56 }}>
			<div className={cx("title")}>
				<h2>HÀNG MỚI</h2>
				<ul className={cx("tabs")}>
					{categories.map((item: any, index: number) => {
						return (
							<li
								className={cx("tab", {
									active: index === indexTab,
								})}
								key={item.id}
								onClick={() => setIndexTab(index)}
							>
								{item.title}
							</li>
						);
					})}
				</ul>
			</div>
			<Row gutter={[16, 16]}>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
				<Col xs={12} md={8} lg={6}>
					<ProductCard product={_product} />
				</Col>
			</Row>
		</section>
	);
};
export default SectionNewProducts;
