import React from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, categoryState } from "redux/slice/category";
import styles from "./NavCategoryList.module.scss";
import { Category } from "interfaces/category";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_LAYOUT, NAV_CATEGORY_LIST } from "constant";
import config from "config";

const cx: Function = classNames.bind(styles);
const NavCategoryList: React.FC = () => {
	const { categories } = useSelector(categoryState);

	const { pathname } = useLocation();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(
			categoryActions.getAllCategoriesFetch({
				parentId: "null",
				depth: NAV_CATEGORY_LIST.DEPTH,
				sortType: "asc",
				limit: 5,
			})
		);
	}, [dispatch]);
	return (
		<div className={cx("nav-category-list")} style={{ height: DEFAULT_LAYOUT.NAV_HEIGHT / 2 }}>
			<div className={cx("nav-category-item")}>
				<Link to={config.routes.home} className={`${cx("item-link")} ${pathname === config.routes.home ? cx("active") : ""}`}>
					Trang chủ
				</Link>
			</div>
			{categories.items.map((item: Category, index: number) => {
				return (
					<div className={cx("nav-category-item")} key={index}>
						<Link to={`/${item.slug}`} className={`${cx("item-link")} ${pathname === `/${item.slug}` ? cx("active") : ""}`}>
							{item.title}
						</Link>
						<div className={cx("underline")}></div>
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(NavCategoryList);
