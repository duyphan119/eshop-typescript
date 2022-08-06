import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as categoryApi from "~/lib/api/categoryApi";
import { categoryActions, categoryState } from "~/redux/slices/categorySlice";
import { Category } from "~/types/category";
import styles from "./styles.module.scss";
const Categories: React.FC = () => {
	const { list } = useSelector(categoryState);

	console.log(list);

	const dispatch = useDispatch();

	React.useEffect(() => {
		(async () => {
			try {
				dispatch(categoryActions.fetch());
				const res = await categoryApi.getCategories({
					sortBy: "id",
					sortType: "asc",
					level: 1,
					depth: 3,
				});
				if (res.status === 200) {
					dispatch(categoryActions.getCategories(res.data.items));
				}
			} catch (error) {
				dispatch(categoryActions.error());
			}
		})();
	}, []);

	return (
		<React.Fragment>
			{list.map((category: Category) => {
				return (
					<Link href={`/${category.slug}`} key={category.id}>
						<a className={styles.title}>{category.title}</a>
					</Link>
				);
			})}
		</React.Fragment>
	);
};

export default React.memo(Categories);
