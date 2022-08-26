import React from "react";
import classNames from "classnames/bind";
import styles from "./MetaList.module.scss";
import Paper from "components/Paper";
import { useDispatch, useSelector } from "react-redux";
import { metaActions, metaState } from "redux/slice/meta";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { Meta } from "interfaces/meta";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { useTitle } from "hooks/useTitle";
import config from "config";
import ModalMeta from "./ModalMeta";
interface Props {}
const cx = classNames.bind(styles);
const MetaList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.metaList);

	const dispatch = useDispatch();

	const { metaList } = useSelector(metaState);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
		[]
	);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const columns: ColumnsType<Meta> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: Meta, b: Meta) => a.name.length - b.name.length,
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a: Meta, b: Meta) =>
				a.description.length - b.description.length,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: Meta) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(metaActions.getCurrentMeta(row));
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
							// 	productActions.deleteProductFetch({
							// 		...row,
							// 		dispatch,
							// 		accessToken,
							// 	})
							// );
						}}
						okText="Có"
						cancelText="Không"
					>
						<Tooltip title="Delete" placement="bottom">
							<Button
								type="primary"
								danger
								size="small"
								icon={<AiOutlineDelete />}
							/>
						</Tooltip>
					</Popconfirm>
				</>
			),
		},
	];

	React.useEffect(() => {
		dispatch(metaActions.getMetaListFetch({}));
	}, [dispatch]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<Meta> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
		],
	};

	const handleDeleteMany = () => {
		// dispatch(
		// 	productActions.deleteManyProductFetch({
		// 		listId: selectedRowKeys,
		// 		dispatch,
		// 		accessToken,
		// 	})
		// );
	};
	const handleSearch = (value: string) => {
		if (value) {
			dispatch(metaActions.getMetaListSearchFetch({ q: value }));
		}
	};

	return (
		<Paper>
			<div className={cx("buttons")}>
				<div>
					<Tooltip title="New product">
						<Button
							type="primary"
							onClick={() => {
								setOpenModal(true);
								dispatch(metaActions.getCurrentMeta(null));
							}}
						>
							New
						</Button>
					</Tooltip>
					<Tooltip title="Delete selected category types">
						<Button
							type="primary"
							disabled={selectedRowKeys.length === 0}
							danger
							onClick={handleDeleteMany}
						>
							Delete
						</Button>
					</Tooltip>
					<Tooltip title="View all category types">
						<Button
							type="default"
							disabled={metaList.listSearch.length === 0}
							onClick={() =>
								dispatch(
									metaActions.getMetaListSearchSuccess([])
								)
							}
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
							onSearch: handleSearch,
						}}
					/>
				</div>
			</div>
			<Table
				rowSelection={rowSelection}
				dataSource={(metaList.listSearch.length === 0
					? metaList.list
					: metaList.listSearch
				).map((item: Meta, index: number) => ({
					...item,
					key: item.id,
				}))}
				pagination={false}
				loading={metaList.isLoading}
				size="small"
				columns={columns}
			/>
			{openModal && (
				<ModalMeta
					visible={openModal}
					onCancel={() => setOpenModal(false)}
				/>
			)}
		</Paper>
	);
};
export default MetaList;
