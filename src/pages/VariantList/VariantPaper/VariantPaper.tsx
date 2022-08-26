import React from "react";
import classNames from "classnames/bind";
import styles from "./VariantPaper.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { variantActions, variantState } from "redux/slice/variant";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Variant } from "interfaces/variant";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import ModalVariant from "../ModalVariant";
import Paper from "components/Paper";

const cx = classNames.bind(styles);

const VariantPaper: React.FC = () => {
	const dispatch = useDispatch();

	const { variants, isLoading } = useSelector(variantState);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		dispatch(variantActions.getAllVariantsFetch({}));
	}, [dispatch]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<Variant> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const columns: ColumnsType<Variant> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: Variant, b: Variant) => a.name.length - b.name.length,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: Variant) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(variantActions.getCurrentVariant(row));
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
				<h2>All variants</h2>
				<div className={cx("buttons")}>
					<div>
						<Tooltip title="New variant">
							<Button
								type="primary"
								onClick={() => {
									setOpenModal(true);
									dispatch(variantActions.getCurrentVariant(null));
								}}
							>
								New
							</Button>
						</Tooltip>
						<Tooltip title="Delete selected variants">
							<Button
								type="primary"
								// disabled={selectedRowKeys.length === 0}
								danger
								// onClick={handleDeleteMany}
							>
								Delete
							</Button>
						</Tooltip>
						<Tooltip title="View all variants">
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
					dataSource={variants.items.map((item: Variant, index: number) => ({
						...item,
						key: item.id,
					}))}
					// loading={variantList.isLoading || isLoadingSearch}
					loading={isLoading}
					size="small"
					columns={columns}
					pagination={false}
				/>
			</Paper>
			{openModal && <ModalVariant visible={openModal} onCancel={() => setOpenModal(false)} />}
		</>
	);
};

export default VariantPaper;
