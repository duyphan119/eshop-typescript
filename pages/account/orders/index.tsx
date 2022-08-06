import { ColumnType } from "antd/lib/table";
import { Button, Table, Tag, Tooltip } from "antd";
import type { NextPage } from "next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "~/components/Container";
import { DefaultLayout } from "~/layouts";
import * as orderApi from "~/lib/api/orderApi";
import { orderActions, orderState } from "~/redux/slices/orderSlice";
import { Order } from "~/types/order";
import { formatDateTime, formatPrice, getToken } from "~/utils";
import Head from "next/head";
import config from "~/config";
import ModalDetail from "~/components/account/orders/ModalDetail";
const MyOrders: NextPage = () => {
	const dispatch = useDispatch();

	const token = getToken();

	const { list } = useSelector(orderState);

	const [openModal, setOpenModal] = React.useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = React.useState<Order | null>(null);

	const columns: ColumnType<Order>[] = [
		{
			title: "Full Name",
			dataIndex: "fullName",
		},
		{
			title: "Phone",
			dataIndex: "phone",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			render: (_: string, row: Order) =>
				`${formatDateTime(row.createdAt)}`,
		},
		{
			title: "Address",
			dataIndex: "address",
			render: (_: string, row: Order) =>
				`${row.address}, ${row.ward}, ${row.district}, ${row.city}`,
		},
		{
			title: "Total",
			dataIndex: "totalPrice",
			render: (_: string, row: Order) => formatPrice(row.totalPrice),
		},
		{
			title: "Status",
			dataIndex: "orderStatus",
			render: (_: string, row: Order) => (
				<Tag
					color={`#${row.orderStatus?.isFinish ? 4 : "c"}${
						row.orderStatus?.allowDelete ? 4 : "c"
					}${row.orderStatus?.isCancelled ? 4 : "c"}`}
				>
					{row.orderStatus?.name}
				</Tag>
			),
		},
		{
			title: "",
			dataIndex: "operation",
			render: (_: string, row: Order) => (
				<Tooltip title="Order detail">
					<Button
						size="small"
						type="primary"
						onClick={() => {
							setOpenModal(true);
							setCurrentOrder(row);
						}}
					>
						View
					</Button>
				</Tooltip>
			),
		},
	];
	React.useEffect(() => {
		if (token) {
			(async () => {
				try {
					dispatch(orderActions.fetch());
					const res = await orderApi.getUserOrders(token, {
						sortBy: "createdAt",
						sortType: "desc",
						all: true,
					});
					if (res.status === 200) {
						dispatch(orderActions.getOrders(res.data.items));
					}
				} catch (error) {
					dispatch(orderActions.error());
				}
			})();
		}
	}, [dispatch]);

	console.log(list);

	return (
		<DefaultLayout>
			<Container>
				<div>
					<Head>
						<title>{config.titles.myOrders}</title>
					</Head>
					<Table
						columns={columns}
						dataSource={list.map((item: Order) => ({
							...item,
							key: item.id,
						}))}
						pagination={false}
					/>
					{openModal && (
						<ModalDetail
							visible={openModal}
							onCancel={() => setOpenModal(false)}
							order={currentOrder}
						/>
					)}
				</div>
			</Container>
		</DefaultLayout>
	);
};

export default MyOrders;
