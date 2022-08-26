import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { variantValueActions, variantValueState } from "redux/slice/variantValue";
import ModalVariantValue from "../ModalVariantValue";
import styles from "./VariantValuePaper.module.scss";

const cx = classNames.bind(styles);

const VariantValuePaper: React.FC = () => {
	const dispatch = useDispatch();

	const { variantValues, isLoading } = useSelector(variantValueState);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		dispatch(variantValueActions.getAllVariantValuesFetch({}));
	}, [dispatch]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<VariantValue> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const columns: ColumnsType<VariantValue> = [
		{
			title: "Variant",
			dataIndex: "variant",
			render: (text: string, row: VariantValue) => row.variant?.name,
			sorter: (a: VariantValue, b: VariantValue) => (a.variant && b.variant ? a.variant.name.length - b.variant.name.length : 0),
		},
		{
			title: "Value",
			dataIndex: "name",
			sorter: (a: VariantValue, b: VariantValue) => a.name.length - b.name.length,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: VariantValue) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(variantValueActions.getCurrentVariantValue(row));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
					&nbsp;&nbsp;
					<Popconfirm
						placement="topRight"
						title={"Are you sure ?"}
						onConfirm={() => {
							// dispatch(
							//   productActions.deleteProductFetch({
							//     ...row,
							//     dispatch,
							//     accessToken,
							//   })
							// );
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

	return (
		<>
			<Paper>
				<h2>All variant values</h2>
				<div className={cx("buttons")}>
					<div>
						<Tooltip title="New variant value">
							<Button
								type="primary"
								onClick={() => {
									setOpenModal(true);
									dispatch(variantValueActions.getCurrentVariantValue(null));
								}}
							>
								New
							</Button>
						</Tooltip>
						<Tooltip title="Delete selected variantValues">
							<Button
								type="primary"
								// disabled={selectedRowKeys.length === 0}
								danger
								// onClick={handleDeleteMany}
							>
								Delete
							</Button>
						</Tooltip>
						<Tooltip title="View all variantValues">
							<Button
								type="default"
								// disabled={listSearch.length === 0}
								// onClick={() =>
								// dispatch(productActions.searchProductSuccess([]))
								// }
							>
								View All
							</Button>
						</Tooltip>
					</div>
					<div>
						<Input.Search
							{...{
								placeholder: "Search here",
								allowClear: true,
								// onSearch: handleSearch,
							}}
						/>
					</div>
				</div>
				<Table
					rowSelection={rowSelection}
					// dataSource={(listSearch.length === 0
					//   ? productList.list
					//   : listSearch
					// ).map((item: Product, index: number) => ({
					//   ...item,
					//   key: item.id,
					// }))}
					dataSource={variantValues.items.map((item: VariantValue, index: number) => ({
						...item,
						key: item.id,
					}))}
					// loading={variantValueList.isLoading || isLoadingSearch}
					loading={isLoading}
					size="small"
					columns={columns}
				/>
			</Paper>
			{/* {openModal && <ModalVariantValue visible={openModal} onCancel={() => setOpenModal(false)} />} */}
		</>
	);
};

export default VariantValuePaper;
