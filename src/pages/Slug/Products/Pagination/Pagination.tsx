import { Pagination, PaginationProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { productState } from "redux/slice/product.slice";
interface Props {
	p?: number;
	onChangePage: Function;
}
const _Pagination: React.FC<Props> = (props: Props) => {
	const { p, onChangePage } = props;

	const { productsPage } = useSelector(productState);
	const { totalResult } = productsPage;
	const onChange: PaginationProps["onChange"] = (page) => {
		onChangePage(page);
	};

	return <Pagination current={p || 1} onChange={onChange} pageSize={2} total={totalResult} />;
};
export default React.memo(_Pagination);
