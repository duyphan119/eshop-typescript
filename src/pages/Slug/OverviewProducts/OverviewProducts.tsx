import { useTitle } from "hooks/useTitle";
import { Category } from "interfaces/category";
import React from "react";
interface Props {
	category: Category;
}
const OverviewProducts: React.FC<Props> = (props: Props) => {
	const { category } = props;

	useTitle(category.name);

	return <>ok</>;
};
export default React.memo(OverviewProducts);
