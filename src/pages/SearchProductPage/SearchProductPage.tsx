import { Col, Pagination, Row } from "antd";
import ProductCard from "components/ProductCard";
import { Product } from "interfaces/product";
import NotFound from "pages/NotFound";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { productActions, productState } from "redux/slice/product.slice";
import "./style.scss";
const PAGE_SIZE = 18;
const SearchProductPage: React.FC = () => {
	const [queryParams] = useSearchParams();
	const q = queryParams.get("q");
	const p = queryParams.get("p");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { products } = useSelector(productState);

	React.useEffect(() => {
		try {
			const page = p ? parseInt(p) : 1;
			dispatch(productActions.getAllProductsFetch({ limit: PAGE_SIZE, p: page }));
		} catch (error) {
			dispatch(productActions.getAllProductsFetch({ limit: PAGE_SIZE, p: 1 }));
		}
	}, [dispatch, p]);

	const handleChangePage = (page: number) => {
		const params: any = {
			...(q ? { q } : {}),
			p: page,
		};
		const urlParams: string = new URLSearchParams(params).toString();
		navigate(`${location.pathname}${urlParams ? "?" + urlParams : ""}`);
	};

	if (products.items.length === 0 && products.count > 0) return <NotFound />;

	return (
		<div className="search-pro-p container">
			<div className="search-pro-p__title">
				{products.count} kết quả tìm kiếm với từ khóa: {q}
			</div>
			<Row gutter={[8, 8]}>
				{products.items.map((product: Product) => {
					return (
						<Col xs={12} sm={8} md={6} xl={4} key={product.id}>
							<ProductCard product={product} />
						</Col>
					);
				})}
				<Col xs={24}>
					<Pagination total={products.count} current={p ? parseInt(p) : 1} pageSize={PAGE_SIZE} onChange={handleChangePage} />
				</Col>
			</Row>
		</div>
	);
};

export default SearchProductPage;
