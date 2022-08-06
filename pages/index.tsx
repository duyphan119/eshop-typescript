import { Col, Row } from "antd";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "~/components/Container";
import ProductCard from "~/components/ProductCard";
import config from "~/config";
import { DefaultLayout } from "~/layouts";
import { getBanners } from "~/lib/api/bannerApi";
import { getProducts } from "~/lib/api/productApi";
import { Banner } from "~/types/banner";
import { Product } from "~/types/product";
import { getURL } from "~/utils";

interface Props {
	products: Product[];
	banners: Banner[];
}

const Home: NextPage<Props> = ({ products, banners }: Props) => {
	console.log(process.env.API_BASE_URL);
	return (
		<DefaultLayout>
			<div>
				<Head>
					<title>{config.titles.home}</title>
				</Head>
				<Swiper
					slidesPerView={1}
					autoplay={{
						delay: 4444,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
				>
					{banners.map((item: Banner) => {
						return (
							<SwiperSlide key={item.id}>
								<Link href={`/${item.slug}`}>
									<a>
										<Image
											loader={({ src }) => {
												return getURL(src);
											}}
											src={item.thumbnail}
											alt="Banner Home"
											width={1536}
											height={480}
										/>
									</a>
								</Link>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			<Container>
				<h1 style={{ textAlign: "center" }}>All Products</h1>
				<Row gutter={[16, 16]}>
					{products?.map((item: Product) => {
						return (
							<Col
								xs={24}
								sm={12}
								md={8}
								lg={6}
								xl={4}
								key={item.id}
							>
								<ProductCard product={item} />
							</Col>
						);
					})}
				</Row>
			</Container>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</DefaultLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const res = await Promise.allSettled([
		getBanners({ metaName: "Banner Home", visible: true }),
		getProducts({
			all: true,
		}),
	]);

	return {
		props: {
			banners:
				res[0].status === "fulfilled" ? res[0].value.data.items : [],
			products:
				res[1].status === "fulfilled" ? res[1].value.data.items : [],
		},
		revalidate: 1,
	};
};

export default Home;
