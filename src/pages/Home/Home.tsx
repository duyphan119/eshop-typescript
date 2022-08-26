import { Button, Col, Row } from "antd";
import { getAllBanners } from "api/bannerApi";
import { getAllProducts } from "api/productApi";
import classNames from "classnames/bind";
import Loading from "components/Loading";
import ProductCard from "components/ProductCard";
import config from "config";
import { HOME_PAGE } from "constant";
import { useTitle } from "hooks/useTitle";
import { Banner } from "interfaces/banner";
import { Product } from "interfaces/product";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import SectionNewProducts from "./SectionNewProducts";
import SectionNews from "./SectionNews";
import SectionProducts from "./SectionProducts";
import Slider from "./Slider";

const cx = classNames.bind(styles);
interface Props {}
const _product = {
	name: "Bộ mặc nhà bé trai",
	price: 329000,
	newPrice: 249000,
	thumbnail: "https://canifa.com/img/486/733/resize/2/l/2ls22s018-sy038-2-thumb.jpg",
	id: 1,
	slug: "/",
} as any;
const Home: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.home);

	const dispatch = useDispatch();

	const [sectionProducts1, setSectionProducts1] = React.useState<Array<Product>>([]);
	const [sectionProducts2, setSectionProducts2] = React.useState<Array<Product>>([]);
	const [sectionProducts3, setSectionProducts3] = React.useState<Array<Product>>([]);
	const [banners1, setBanners1] = React.useState<Array<Banner>>([]);
	const [banners2, setBanners2] = React.useState<Array<Banner>>([]);
	const [banners3, setBanners3] = React.useState<Array<Banner>>([]);
	const [banners4, setBanners4] = React.useState<Array<Banner>>([]);
	const [banners5, setBanners5] = React.useState<Array<Banner>>([]);
	const [banners6, setBanners6] = React.useState<Array<Banner>>([]);
	const [banners7, setBanners7] = React.useState<Array<Banner>>([]);
	const [banners8, setBanners8] = React.useState<Array<Banner>>([]);
	const [loading, setLoading] = React.useState<boolean>(true);

	// const { homePage } = useSelector(productState);
	// const { accessToken } = useSelector(authState);
	// const { slider } = useSelector(bannerState);
	// React.useEffect(() => {
	// 	dispatch(
	// 		bannerActions.getBannerListSliderFetch({
	// 			metaName: HOME_PAGE.META_SLIDER,
	// 		})
	// 	);
	// 	dispatch(
	// 		productActions.getProductListHomePageFetch({
	// 			params: {
	// 				limit: LIMIT.NEWEST_HOME_PAGE,
	// 				sortType: "desc",
	// 			},
	// 			accessToken,
	// 			dispatch,
	// 		})
	// 	);
	// }, [dispatch, accessToken]);

	React.useEffect(() => {
		(async () => {
			try {
				const resPromise = await Promise.allSettled([
					getAllBanners({ isShow: "true", metaName: "Banner Home Page" }),
					getAllBanners({ isShow: "true", metaName: "Banner Sale For You" }),
					getAllBanners({ isShow: "true", metaName: "Banner Good Price Product" }),
					getAllBanners({ isShow: "true", metaName: "Banner Section Product Style At Home" }),
					getAllProducts({ limit: 5 }),
					getAllBanners({ isShow: "true", metaName: "Banner Canifa Z" }),
					getAllBanners({ isShow: "true", metaName: "Banner Section Product Ao Phong" }),
					getAllProducts({ limit: 5 }),
					getAllBanners({ isShow: "true", metaName: "Banner Section Product Family" }),
					getAllProducts({ limit: 5 }),
					getAllBanners({ isShow: "true", metaName: "Banner Section Product Quan Jeans" }),
				]);
				if (resPromise[0].status === "fulfilled") {
					setBanners1(resPromise[0].value.data.data.items);
				}
				if (resPromise[1].status === "fulfilled") {
					setBanners2(resPromise[1].value.data.data.items);
				}
				if (resPromise[2].status === "fulfilled") {
					setBanners3(resPromise[2].value.data.data.items);
				}
				if (resPromise[3].status === "fulfilled") {
					setBanners4(resPromise[3].value.data.data.items);
				}
				if (resPromise[4].status === "fulfilled") {
					setSectionProducts1(resPromise[4].value.data.data.items);
				}
				if (resPromise[5].status === "fulfilled") {
					setBanners5(resPromise[5].value.data.data.items);
				}
				if (resPromise[6].status === "fulfilled") {
					setBanners6(resPromise[6].value.data.data.items);
				}
				if (resPromise[7].status === "fulfilled") {
					setSectionProducts2(resPromise[7].value.data.data.items);
				}
				if (resPromise[8].status === "fulfilled") {
					setBanners7(resPromise[8].value.data.data.items);
				}
				if (resPromise[9].status === "fulfilled") {
					setSectionProducts3(resPromise[9].value.data.data.items);
				}
				if (resPromise[10].status === "fulfilled") {
					setBanners8(resPromise[10].value.data.data.items);
				}
			} catch (error) {}
			setLoading(false);
		})();
	}, []);
	if (loading) return <Loading />;
	return (
		<div className="container">
			{banners1.length > 0 && (
				<section className={cx("slider")} style={{ height: HOME_PAGE.SLIDER_HEIGHT }}>
					<Slider banners={banners1} />
				</section>
			)}
			{banners2.length > 0 && (
				<section style={{ marginTop: 56 }}>
					<h2>Ưu đãi riêng bạn</h2>
					<Row>
						{banners2.map((item: Banner) => {
							return (
								<Col xs={24} md={12} key={item.id}>
									<Link to={`/${item.slug}`}>
										<img style={{ width: "100%" }} src={item.thumbnail} alt="" />
									</Link>
								</Col>
							);
						})}
					</Row>
				</section>
			)}
			{banners3.length > 0 && (
				<section style={{ marginTop: 56 }}>
					<h2>Sản phẩm giá tốt</h2>
					<Row gutter={[16, 16]}>
						{banners3.map((item: Banner) => {
							return (
								<Col xs={24} key={item.id}>
									<Link to={`/${item.slug}`}>
										<img style={{ width: "100%" }} src={item.thumbnail} alt="" />
									</Link>
								</Col>
							);
						})}
					</Row>
				</section>
			)}

			<SectionProducts title="Style at home" products={sectionProducts1} banners={banners4} />

			{banners5.length > 0 && (
				<section style={{ marginTop: 56 }}>
					<h2>Canifa Z</h2>
					<Row gutter={[16, 16]}>
						{banners5.map((item: Banner) => {
							return (
								<Col xs={24} key={item.id}>
									<Link to={`/${item.slug}`}>
										<img style={{ width: "100%" }} src={item.thumbnail} alt="" />
									</Link>
								</Col>
							);
						})}
					</Row>
				</section>
			)}

			<SectionProducts title="Áo phông" products={sectionProducts2} banners={banners6} />
			<SectionProducts title="BST Gia đình" products={sectionProducts3} banners={banners7} />
			{banners8.length > 0 && (
				<section style={{ marginTop: 56 }}>
					<h2>Quần jeans</h2>
					<Row gutter={[16, 16]}>
						{banners8.map((item: Banner) => {
							return (
								<Col xs={24} key={item.id}>
									<Link to={`/${item.slug}`}>
										<img style={{ width: "100%" }} src={item.thumbnail} alt="" />
									</Link>
								</Col>
							);
						})}
					</Row>
				</section>
			)}
			<SectionNewProducts />
			<SectionNews />
			{/* <section className={cx("products-wrapper")}>
				<div className={cx("title")}>Sản phẩm mới</div>
				<Row gutter={[24, 24]}>
					{homePage.isLoading
						? "Đang tải"
						: !homePage.isError &&
						  homePage.list.map((item: any, index: number) => {
								return (
									<Col
										lg={4}
										md={6}
										sm={8}
										xs={12}
										key={index}
									>
										<ProductCard product={item} />
									</Col>
								);
						  })}
				</Row>
			</section> */}
		</div>
	);
};

export default Home;
