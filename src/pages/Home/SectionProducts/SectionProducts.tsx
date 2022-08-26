import { Col, Row } from "antd";
import classNames from "classnames/bind";
import ProductCard from "components/ProductCard";
import { Product } from "interfaces/product";
import React from "react";
import Slider from "../Slider";
import styles from "./SectionProducts.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Banner } from "interfaces/banner";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
const cx = classNames.bind(styles);
interface Props {
	title?: string;
	products?: Array<Product>;
	banners?: Array<Banner>;
}

const SectionProducts: React.FC<Props> = ({ title, products, banners }: Props) => {
	return (
		<section style={{ marginTop: 56 }}>
			<h2>{title}</h2>
			<Row gutter={[16, 16]}>
				{banners && banners.length > 0 && (
					<Col xs={24} md={6} style={{ minHeight: 600 }}>
						<Slider banners={banners} />
					</Col>
				)}

				<Col xs={24} md={banners && banners.length > 0 ? 18 : 24}>
					<Swiper
						spaceBetween={8}
						modules={[Navigation]}
						navigation={{
							prevEl: `.${cx("prev-arrow")}`,
							nextEl: `.${cx("next-arrow")}`,
						}}
						slidesPerView={3}
						loop={true}
						speed={1000}
						longSwipesMs={3000}
						style={{ height: "100%" }}
					>
						{products?.map((product: Product) => {
							return (
								<SwiperSlide key={product.id} style={{ height: "100%" }}>
									<ProductCard product={product} />
								</SwiperSlide>
							);
						})}
						<div className={cx("prev-arrow")}>
							<GrFormPrevious />
						</div>
						<div className={cx("next-arrow")}>
							<GrFormNext />
						</div>
					</Swiper>
				</Col>
			</Row>
		</section>
	);
};
export default SectionProducts;
