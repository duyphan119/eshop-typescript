import React from "react";
import styles from "./OrderList.module.scss";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import { Button, Form, Input, Select, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { orderActions, orderState } from "redux/slice/order.slice";
import { useTitle } from "hooks/useTitle";
import { ColumnsType } from "antd/lib/table/interface";
import config from "config";
import { Order } from "interfaces/order.interface";
import { formatPrice } from "utils";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
interface Props {}
const cx = classNames.bind(styles);
const OrderList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.productList);
	const { orders, isLoading, orderList } = useSelector(orderState);
	const { accessToken } = useSelector(authState);
	const { page, pageSize } = orderList;

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (accessToken) {
			dispatch(orderActions.getOrdersFetch({ accessToken, dispatch, params: { p: page, limit: pageSize } }));
		}
	}, [dispatch, accessToken, page, pageSize]);

	const columns: ColumnsType<Order> = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "City",
			dataIndex: "city",
		},
		{
			title: "Total",
			dataIndex: "totalPrice",
			render: (text: string, row: Order) => formatPrice(row.totalPrice),
		},
		{
			title: "Status",
			dataIndex: "orderStatus",
			render: (text: string, row: Order) => row.orderStatus?.name,
		},
		{
			title: "",
			width: 50,
			render: (text: string, row: Order) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								navigate(config.routes.editOrder.replace(":id", row.id.toString()));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
				</>
			),
		},
	];

	console.log(orders);

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
				<Table
					dataSource={orders.items.map((item: Order, index: number) => ({
						...item,
						key: item.id,
					}))}
					pagination={{
						total: orders.count,
						pageSize: pageSize,
						current: page,
						showSizeChanger: true,
						pageSizeOptions: [10, 50, 100, 200],
						onChange: (page: number, pageSize: number) => {
							dispatch(
								orderActions.setOrderListState({
									...orderList,
									page,
									pageSize,
								})
							);
						},
					}}
					loading={isLoading}
					columns={columns}
				/>
			</Paper>
		</>
	);
};
export default OrderList;
