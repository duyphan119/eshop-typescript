import { Button, Modal, Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import Image from "next/image";
import React from "react";
import { Order } from "~/types/order";
import { OrderItem } from "~/types/orderItem";
import { formatDateTime, formatPrice, getURL } from "~/utils";
import styles from "./styles.module.scss";

interface Props {
	order?: Order | null;
	visible: boolean;
	onCancel: Function;
}

const ModalDetail: React.FC<Props> = ({ order, visible, onCancel }: Props) => {
	if (!order) return <></>;

	const columns: ColumnType<OrderItem>[] = [
		{
			title: "Product",
			dataIndex: "product",
			render: (_: string, row: OrderItem) => (
				<>
					<Space>
						<Image
							loader={({ src }) => src}
							src={getURL(row.productOption?.thumbnail)}
							alt=""
							width={56}
							height={72}
						/>
						<div>
							<div>{row.productOption?.product?.name}</div>
							<div>{row.productOption?.title}</div>
						</div>
					</Space>
				</>
			),
		},
		{
			title: "Price",
			dataIndex: "price",
			render: (_: string, row: OrderItem) => formatPrice(row.price),
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
		},
		{
			title: "Total",
			dataIndex: "total",
			render: (_: string, row: OrderItem) =>
				formatPrice(row.price * row.quantity),
		},
	];

	return (
		<Modal
			visible={visible}
			destroyOnClose={true}
			onCancel={() => onCancel()}
			width={700}
			closeIcon={<></>}
			footer={
				<>
					<Button onClick={() => onCancel()}>Close</Button>
				</>
			}
			title={`Mã đơn hàng: ${order.id}`}
		>
			<ul className={styles["info-list"]}>
				<li>
					<span>Created At:</span>
					<span>{formatDateTime(order.createdAt)}</span>
				</li>

				<li>
					<span>Full Name:</span> <span>{order.fullName}</span>
				</li>
				<li>
					<span>Address:</span>
					<span>{`${order.address}, ${order.ward}, ${order.district}, ${order.city}`}</span>
				</li>
				<li>
					<span>Phone:</span> <span>{order.phone}</span>
				</li>
				<li>
					<span>Status:</span> <span>{order.orderStatus?.name}</span>
				</li>
			</ul>
			<Table
				columns={columns}
				dataSource={order.orderItems?.map((item: OrderItem) => ({
					...item,
					key: item.id,
				}))}
				pagination={false}
			/>
			<ul className={styles["price-result-list"]}>
				<li>
					<span>Tạm tính:</span>
					<span>{formatPrice(order.totalPrice + 22000)}</span>
				</li>
				<li>
					<span>Vận chuyển:</span> <span>{formatPrice(22000)}</span>
				</li>
				<li>
					<span>Tổng tiền:</span>
					<span>{formatPrice(order.totalPrice)}</span>
				</li>
			</ul>
		</Modal>
	);
};

export default React.memo(ModalDetail);
