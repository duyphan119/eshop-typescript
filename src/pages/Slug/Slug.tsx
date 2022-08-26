import { Category } from "interfaces/category";
import { DefaultLayout } from "layouts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { categoryActions, categoryState } from "redux/slice/category";
import OverviewProducts from "./OverviewProducts";
import Products from "./Products";
interface Props {}

const Slug: React.FC<Props> = (props: Props) => {
	const { slug } = useParams();

	const dispatch = useDispatch();

	const { categoryListSlug } = useSelector(categoryState);
	const { list } = categoryListSlug;

	React.useEffect(() => {
		dispatch(
			categoryActions.getCategoryListSlugFetch({
				sortType: "asc",
				depth: 3,
			})
		);
	}, [dispatch]);

	const switchPages = React.useMemo((): React.ReactNode => {
		if (list.length !== 0) {
			let Page: any = null;

			const current = list.find((item: Category) => item.slug === slug);
			console.log(current);
			if (current && current.categoryType) {
				if (current.categoryType.name === "Nhóm sản phẩm") {
					Page = OverviewProducts;
				} else if (current.categoryType.name === "Sản phẩm") {
					console.log("first");
					Page = Products;
				}
			}

			if (Page) {
				return (
					<DefaultLayout>
						<Page category={current} />
					</DefaultLayout>
				);
			}
		}
		return "a";
	}, [list, slug]);

	return <>{switchPages}</>;
};
export default Slug;
