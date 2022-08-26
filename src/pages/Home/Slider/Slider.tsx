import { HOME_PAGE } from "constant";
import { Banner } from "interfaces/banner";
import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
interface Props {
	banners: Banner[];
}
SwiperCore.use([Autoplay]);
const Slider: React.FC<Props> = (props: Props) => {
	const { banners } = props;

	return (
		<Swiper slidesPerView={1} autoplay={{ delay: 3333 }} style={{ height: "100%" }}>
			{banners.map((banner: Banner, index: number) => (
				<SwiperSlide key={index} style={{ height: "100%" }}>
					<Link to={`/${banner.slug}`} style={{ height: "100%", display: "block" }}>
						<img
							src={banner.thumbnail}
							alt={banner.description}
							style={{ height: "100%", objectFit: "cover", width: "100%" }}
							height={HOME_PAGE.SLIDER_HEIGHT}
						/>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default React.memo(Slider);
