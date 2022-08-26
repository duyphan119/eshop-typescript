import { Avatar, Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { TABLE } from "constant";
import { useTitle } from "hooks/useTitle";
import { ProductOption } from "interfaces/productOption";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { productOptionActions, productOptionState } from "redux/slice/productOption";
import { getURL } from "utils";
import styles from "./Inventory.module.scss";
interface Props {}

const cx = classNames.bind(styles);
const Inventory: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.inventory);

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);
	const { inventory } = useSelector(productOptionState);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<ProductOption> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const columns: ColumnsType<ProductOption> = [
		{
			title: "Product",
			dataIndex: "product",
			sorter: (a: ProductOption, b: ProductOption) => (a.product && b.product ? a.product.name.length - b.product.name.length : 0),
			render: (text: string, row: ProductOption) =>
				row.product ? (
					<Space>
						{row.product.thumbnail && (
							<Avatar
								src={getURL(row.product.thumbnail)}
								alt=""
								shape="square"
								style={{
									width: TABLE.PRODUCT_WIDTH_THUMBNAIL,
									height: TABLE.PRODUCT_HEIGHT_THUMBNAIL,
								}}
							/>
						)}{" "}
						{row.product.name}
					</Space>
				) : (
					<></>
				),
		},
		{
			title: "Option",
			dataIndex: "title",
		},
		{
			title: "SKU",
			dataIndex: "sku",
		},
		{
			title: "Amount",
			dataIndex: "amount",
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: ProductOption) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(productOptionActions.getCurrentInventory(row));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
					&nbsp;&nbsp;
					<Popconfirm
						placement="topRight"
						title={"Are you sure ?"}
						onConfirm={() => {
							// dispatch();
						}}
						okText="Có"
						cancelText="Không"
					>
						<Tooltip title="Delete" placement="bottom">
							<Button type="primary" danger size="small" icon={<AiOutlineDelete />} />
						</Tooltip>
					</Popconfirm>
				</>
			),
		},
	];

	React.useEffect(() => {
		if (accessToken) {
			dispatch(
				productOptionActions.getAllInventoryFetch({
					accessToken,
					dispatch,
				})
			);
		}
	}, [accessToken, dispatch]);

	return (
		<Paper>
			<h2>Inventory Management</h2>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={inventory.list.map((item: ProductOption) => ({
					...item,
					key: item.id,
				}))}
				loading={inventory.isLoading}
			/>
		</Paper>
	);
};

export default Inventory;
