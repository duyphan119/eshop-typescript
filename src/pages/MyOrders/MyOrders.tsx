import { Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { Order } from "interfaces/order.interface";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { orderActions, orderState } from "redux/slice/order.slice";
import { formatDateTime, formatPrice } from "utils";
interface Props {}

enum ActionKind {
	PAGE_CHANGE = "PAGE_CHANGE",
}

type Action = {
	type: string;
	payload: InitState & any;
};

type InitState = {
	page: number;
	pageSize: number;
};

const initState = {
	page: 1,
	pageSize: 10,
};

const reducer = (state: InitState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		default:
			return {
				...state,
				...payload,
			};
	}
};

const MyOrders: React.FC<Props> = (props: Props) => {
	const { accessToken } = useSelector(authState);
	const dispatchReactRedux = useDispatch();
	const { orders, isLoading } = useSelector(orderState);
	const [{ page, pageSize }, dispatch] = React.useReducer(reducer, initState);

	const columns: ColumnsType<Order> = [
		{
			title: "Đơn hàng",
			dataIndex: "id",
			sorter: (a: Order, b: Order) => a.id - b.id,
		},
		{
			title: "Ngày mua",
			dataIndex: "createdAt",
			sorter: (a: Order, b: Order) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			render: (text: string) => formatDateTime(text),
		},
		{
			title: "Tổng tiền",
			dataIndex: "totalPrice",
			sorter: (a: Order, b: Order) => a.totalPrice - b.totalPrice,
			render: (text: string, row: Order) => formatPrice(row.totalPrice),
		},
		{
			title: "Trạng thái",
			dataIndex: "orderStatus",
			sorter: (a: Order, b: Order) => (a.orderStatus && b.orderStatus ? a.orderStatus.name.length - b.orderStatus.name.length : 0),
			render: (text: string, row: Order) => row.orderStatus?.name,
		},
	];

	React.useEffect(() => {
		if (accessToken) {
			dispatchReactRedux(orderActions.getMyOrdersFetch({ accessToken, dispatch: dispatchReactRedux, params: { limit: pageSize, p: page } }));
		}
	}, [accessToken, dispatchReactRedux, page, pageSize]);

	console.log("my orders: ", orders);
	return (
		<div className={"my-orders " + (orders.count === 0 ? "my-orders-empty" : "")}>
			<Table
				columns={columns}
				loading={isLoading}
				dataSource={orders.items.map((item: Order) => ({ ...item, key: item.id }))}
				pagination={{
					total: orders.count,
					pageSize,
					current: page,
					showSizeChanger: true,
					pageSizeOptions: [10, 50],
					onChange: (page: number, pageSize: number) => {
						dispatch({ type: ActionKind.PAGE_CHANGE, payload: { page, pageSize } });
					},
				}}
			/>
		</div>
	);
};
export default MyOrders;
