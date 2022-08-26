import React from "react";
import styles from "./OrderList.module.scss";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { orderState } from "redux/slice/order.slice";
import { useTitle } from "hooks/useTitle";
import config from "config";
interface Props {}
const cx = classNames.bind(styles);
const OrderList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.productList);
	const { orders, isLoading , orderList } = useSelector(orderState);
	const { accessToken } = useSelector(authState);

	const dispatch = useDispatch();


	const [form] = Form.useForm();

    // React.useEff

	

	const handleSearch = (value: string) => {
		if (value && accessToken) {
			// dispatch(
			// 	productActions.searchProductFetch({
			// 		accessToken,
			// 		dispatch,
			// 		params: { q: value },
			// 	})
			// );
		}
	};
	return (
		<>
			<Paper>
				<div className={cx("buttons")}>
					<div>
						<Tooltip title="New order">
							<Button
								type="primary"
								onClick={() => {
									// setOpenModal(true);
									// dispatch(productActions.getCurrentProduct(null));
								}}
							>
								New
							</Button>
						</Tooltip>
					</div>
					<div style={{ display: "flex" }}>
						<Form initialValues={{ searchBy: "name" }} form={form}>
							<Form.Item name="searchBy">
								<Select>
									<Select.Option value="name">Name</Select.Option>
									<Select.Option value="slug">Slug</Select.Option>
									<Select.Option value="price">Price</Select.Option>
									<Select.Option value="newPrice">New Price</Select.Option>
								</Select>
							</Form.Item>
						</Form>
						<Input.Search
							{...{
								placeholder: "Search here",
								allowClear: true,
								onSearch: handleSearch,
							}}
						/>
					</div>
				</div>
			</Paper>
		</>
	);
};
export default OrderList;
