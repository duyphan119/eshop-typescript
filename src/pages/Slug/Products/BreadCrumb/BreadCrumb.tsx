import { Breadcrumb } from "antd";
import config from "config";
import { Category } from "interfaces/category";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
	category: Category;
}
const CustomBreadCrumb: React.FC<Props> = (props: Props) => {
	const { category } = props;

	const showBreadcrumbItems = React.useMemo(() => {
		const result = [];

		let parent = category.parent;
		while (true) {
			if (parent) {
				result.unshift(
					<Breadcrumb.Item key={parent.id}>
						<Link style={{ color: "#000" }} to={`/${parent.slug}`}>
							{parent.title}
						</Link>
					</Breadcrumb.Item>
				);
				parent = parent.parent;
			} else {
				return result;
			}
		}
	}, [category]);

	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link style={{ color: "#000" }} to={config.routes.home}>
					Home
				</Link>
			</Breadcrumb.Item>
			{showBreadcrumbItems}
		</Breadcrumb>
	);
};
export default CustomBreadCrumb;
