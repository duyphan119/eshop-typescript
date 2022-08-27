import { Button, Col, Form, message, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { getOrderById, updateOrder } from "api/orderApi";
import { getAllOrderStatuses } from "api/orderStatusApi";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import { CODE } from "constant";
import { Order } from "interfaces/order.interface";
import { OrderItem } from "interfaces/orderItem";
import { OrderStatus } from "interfaces/orderStatus.interface";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { formatPrice } from "utils";
import styles from "./EditOrder.module.scss";
interface Props {}
interface State {
	order: Order | null;
	orderStatuses: Array<OrderStatus>;
	loading: boolean;
	editUserPayload?: InitialValues;
}
interface InitialValues {
	orderStatusId: number;
}
const cx = classNames.bind(styles);
const EditOrder: React.FC<Props> = (props: Props) => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);
	const [state, setState] = React.useState<State>({
		order: null,
		orderStatuses: [],
		loading: false,
	});
	const { order, orderStatuses, loading, editUserPayload } = state;

	React.useEffect(() => {
		if (accessToken && id) {
			(async () => {
				try {
					let _order: Order | null = null;
					let _orderStatuses: Array<OrderStatus> = [];
					const resPromises = await Promise.allSettled([getOrderById(accessToken, dispatch, parseInt(id)), getAllOrderStatuses()]);
					if (resPromises[0].status === "fulfilled") {
						const { code, data } = resPromises[0].value.data;
						if (code === CODE.OK) {
							_order = data;
						}
					}
					if (resPromises[1].status === "fulfilled") {
						const { code, data } = resPromises[1].value.data;
						if (code === CODE.OK) {
							_orderStatuses = data.items;
						}
					}
					setState((prev) => ({
						...prev,
						order: _order,
						orderStatuses: _orderStatuses,
						...(_order ? { editUserPayload: { orderStatusId: _order.orderStatusId } } : {}),
					}));
				} catch (error) {}
			})();
		}
	}, [id, accessToken, dispatch]);

	React.useEffect(() => {
		if (accessToken && loading && id && editUserPayload) {
			(async () => {
				try {
					const res = await updateOrder(accessToken, dispatch, parseInt(id), editUserPayload);
					const { code, data } = res.data;
					if (code === CODE.OK) {
						setState((prev) => ({
							...prev,
							loading: false,
							order: { ...prev.order, ...data },
						}));
						message.success("Order is updated successfully");
						return;
					}
				} catch (error) {}
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			})();
		}
	}, [loading, editUserPayload, accessToken, dispatch, id]);

	if (!order) return <></>;

	const columns: ColumnsType<OrderItem> = [
		{
			title: "Thumbnail",
			width: 80,
			render: (text: string, row: OrderItem) => <img alt="" width={64} src={row.productOption?.thumbnail || row.productOption?.product?.thumbnail} />,
		},
		{
			title: "Name",
			render: (text: string, row: OrderItem) => row.productOption?.product?.name,
		},
		{
			title: "Option",
			render: (text: string, row: OrderItem) => row.productOption?.title,
		},
		{
			title: "Price Each",
			render: (text: string, row: OrderItem) => formatPrice(row.price),
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
		},
		{
			title: "Total",
			render: (text: string, row: OrderItem) => formatPrice(row.quantity * row.price),
		},
	];

	const onFinish = (values: InitialValues) => {
		setState({ ...state, loading: true, editUserPayload: values });
	};

	return (
		<>
			<Form
				initialValues={
					{
						orderStatusId: order.orderStatusId,
					} as InitialValues
				}
				onFinish={onFinish}
			>
				<Row gutter={[16, 16]} style={{ alignItems: "stretch" }}>
					<Col xs={24}>
						<Paper>
							<Button htmlType="submit" type={loading ? "default" : "primary"} loading={loading}>
								{loading ? "Đang lưu" : "Lưu"}
							</Button>
							<Button htmlType="button" type="primary" style={{ marginLeft: 16 }}>
								Xuất PDF
							</Button>
						</Paper>
					</Col>
					<Col xs={24} lg={7}>
						<Row gutter={[16, 16]} style={{ alignItems: "stretch" }}>
							<Col xs={24}>
								<Paper title="Thông tin đơn hàng" style={{ height: "100%" }}>
									<ul className={cx("order-infos")}>
										<li className={cx("item")}>
											<div className={cx("label")}>Họ tên:</div>
											<div className={cx("value")}>{order.fullName}</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Điện thoại:</div>
											<div className={cx("value")}>{order.phone}</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Địa chỉ:</div>
											<div className={cx("value")}>{order.address}</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Phường / Xã:</div>
											<div className={cx("value")}>{order.ward}</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Quận / Huyện:</div>
											<div className={cx("value")}>{order.district}</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Tỉnh / TP:</div>
											<div className={cx("value")}>{order.city}</div>
										</li>
										{/* <li>
									<div className={cx("label")}>Địa chỉ:</div>
									<div className={cx("value")}>
										{order.address === "" ? "" : `${order.address},`} {order.ward}, {order.district}, {order.city}
									</div>
								</li> */}
									</ul>
								</Paper>
							</Col>
							<Col xs={24}>
								<Paper title="Trạng thái đơn hàng" style={{ height: "100%" }}>
									<Form.Item name="orderStatusId">
										<Select>
											{orderStatuses.map((item: OrderStatus) => {
												return (
													<Select.Option key={item.id} value={item.id}>
														{item.name}
													</Select.Option>
												);
											})}
										</Select>
									</Form.Item>
								</Paper>
							</Col>
							<Col xs={24}>
								<Paper title={order.paymentMethod?.name} style={{ height: "100%" }}>
									<ul className={cx("price")}>
										<li className={cx("item")}>
											<div className={cx("label")}>Đơn giá:</div>
											<div className={cx("value")}>{formatPrice(order.shippingPrice + order.totalPrice)}₫</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Vận chuyển:</div>
											<div className={cx("value")}>{formatPrice(order.shippingPrice)}₫</div>
										</li>
										<li className={cx("item")}>
											<div className={cx("label")}>Tổng tiền:</div>
											<div className={cx("value")}>{formatPrice(order.totalPrice)}₫</div>
										</li>
									</ul>
								</Paper>
							</Col>
						</Row>
					</Col>
					<Col xs={24} lg={17}>
						<Paper title="Sản phẩm" style={{ height: "100%" }}>
							<Table
								columns={columns}
								dataSource={order.orderItems?.map((item: OrderItem) => ({ ...item, key: item.productOptionId }))}
								pagination={false}
							/>
						</Paper>
					</Col>
				</Row>
			</Form>
		</>
	);
};
export default EditOrder;
