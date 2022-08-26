import { Col, Row } from "antd";
import classNames from "classnames/bind";
import ProductCard from "components/ProductCard";
import { SLUG } from "constant";
import { useTitle } from "hooks/useTitle";
import { Category } from "interfaces/category";
import { Product } from "interfaces/product";
import { GetProducts } from "interfaces/productCategory";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { productActions, productState } from "redux/slice/product.slice";
import BreadCrumb from "./BreadCrumb";
import Filter from "./Filter";
import Pagination from "./Pagination";
import styles from "./Products.module.scss";
import Sort from "./Sort";

interface Props {
	category: Category;
}

const cx = classNames.bind(styles);

const Products: React.FC<Props> = (props: Props) => {
	const { category } = props;

	useTitle(category.description || category.name);

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { productsPage } = useSelector(productState);
	const { list } = productsPage;

	const [searchParams] = useSearchParams();

	const sortBy = searchParams.get("sortBy");
	const sortType = searchParams.get("sortType");
	const tags = searchParams.get("tags");
	const p = searchParams.get("p");

	const [queryParams, setQueryParams] = React.useState<GetProducts>(() => initialQueryPrams());
	function initialQueryPrams(): GetProducts {
		const obj: GetProducts = {};

		if (sortBy) obj.sortBy = sortBy;
		if (sortType && (sortType === "asc" || sortType === "desc")) obj.sortType = sortType;
		if (tags) obj.tags = tags;
		if (p) {
			const newP = parseInt(p);
			if (!isNaN(newP)) {
				obj.p = newP;
			}
		}

		return obj;
	}

	console.log(list);

	React.useEffect(() => {
		if (category.id) {
			dispatch(
				productActions.getProductsPageFetch({
					categoryId: category.id,
					params: { ...queryParams, limit: SLUG.PRODUCTS_PAGE.LIMIT },
				})
			);
		}
	}, [dispatch, category, queryParams]);

	const handleSort = (key: string) => {
		if (key !== "") {
			const [sortBy, sortType] = key.split("_");
			if (sortBy && sortType && (sortType === "asc" || sortType === "desc")) {
				setQueryParams({ ...queryParams, sortBy, sortType });
			}
		} else {
			const { sortBy, sortType, ...others } = queryParams;
			setQueryParams(others);
		}
	};

	const handleFilter = (key: string) => {
		if (queryParams.tags) {
			const arr = queryParams.tags.split(",");
			const index = arr.findIndex((item: string) => item === key);
			if (index === -1) {
				setQueryParams({ ...queryParams, tags: `${tags},${key}` });
			} else {
				arr.splice(index, 1);
				if (arr.length === 0) {
					const { tags, ...others } = queryParams;
					setQueryParams(others);
				} else {
					setQueryParams({ ...queryParams, tags: arr.join(",") });
				}
			}
		} else {
			setQueryParams({ ...queryParams, tags: key });
		}
	};

	React.useEffect(() => {
		const _ = new URLSearchParams(queryParams as any).toString();
		navigate(`${pathname}${_ === "" ? "" : "?" + _}`);
	}, [navigate, pathname, queryParams]);

	const handleChangePage = (page: number) => {
		if (page > 1) {
			setQueryParams({ ...queryParams, p: page });
		} else {
			const { p, ...others } = queryParams;
			setQueryParams(others);
		}
	};

	return (
		<div className={cx("products")}>
			<Row gutter={[16, 16]}>
				<Col xs={24}>
					<div className={cx("breadcrumb")}>
						<BreadCrumb category={category} />
						<div className={cx("current")}>{category.name}</div>
					</div>
				</Col>
				<Col xs={5}>
					<Filter cx={cx} onFilter={handleFilter} tags={queryParams.tags} />
				</Col>
				<Col xs={19}>
					<div className={cx("count-sort-wrapper")}>
						<div className={cx("count")}>{list.length} products</div>
						<Sort sortBy={queryParams.sortBy} sortType={queryParams.sortType} cx={cx} onSort={handleSort} />
					</div>
					<Row gutter={[16, 16]}>
						{list.map((item: Product) => {
							return (
								<Col xs={6} key={item.id}>
									<ProductCard product={item} />
								</Col>
							);
						})}
						{list.length > 0 && (
							<Col xs={24}>
								<div className={cx("pagination")}>
									<Pagination p={queryParams.p} onChangePage={handleChangePage} />
								</div>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</div>
	);
};
export default React.memo(Products);
