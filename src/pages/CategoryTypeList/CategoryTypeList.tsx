import React from "react";
import classNames from "classnames/bind";
import styles from "./CategoryTypeList.module.scss";
import Paper from "components/Paper";
import { useDispatch, useSelector } from "react-redux";
import { categoryTypeActions, categoryTypeState } from "redux/slice/categoryType";
import { Button, Form, Input, Popconfirm, Select, Table, Tooltip } from "antd";
import { CategoryType } from "interfaces/categoryType";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { useTitle } from "hooks/useTitle";
import config from "config";
import ModalCategoryType from "./ModalCategoryType";
import { authState } from "redux/slice/auth.slice";
interface Props {}
const cx = classNames.bind(styles);
const CategoryTypeList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.categoryTypeList);

	const dispatch = useDispatch();

	const { categoryTypes, isLoading } = useSelector(categoryTypeState);
	const { accessToken } = useSelector(authState);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [form] = Form.useForm();

	const columns: ColumnsType<CategoryType> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: CategoryType, b: CategoryType) => a.name.length - b.name.length,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: CategoryType) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(categoryTypeActions.getCurrentCategoryType(row));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
					&nbsp;&nbsp;
					<Popconfirm
						placement="topRight"
						title={"Are you sure ?"}
						onConfirm={() => {
							if (accessToken) {
								dispatch(
									categoryTypeActions.deleteCategoryTypeFetch({
										dispatch,
										accessToken,
										id: row.id,
										onDone: onDeleteDone,
									})
								);
							}
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

	function onDeleteDone() {
		if (accessToken) {
			if (categoryTypes.items.length > 1) {
				dispatch(
					categoryTypeActions.getAllCategoryTypesFetch({
						p: page,
						limit: pageSize,
					})
				);
			} else {
				setPage((prev) => (prev === 0 ? 0 : prev - 1));
			}
		}
	}

	React.useEffect(() => {
		dispatch(categoryTypeActions.getAllCategoryTypesFetch({}));
	}, [dispatch]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<CategoryType> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const handleDeleteMany = () => {
		if (accessToken) {
			dispatch(
				categoryTypeActions.deleteManyCategoryTypeFetch({
					ids: selectedRowKeys,
					dispatch,
					accessToken,
				})
			);
		}
	};
	const handleSearch = (value: string) => {
		dispatch(
			categoryTypeActions.getAllCategoryTypesFetch({
				p: page,
				limit: pageSize,
				...(value ? { [form.getFieldValue("searchBy")]: value } : {}),
			})
		);
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
								dispatch(categoryTypeActions.getCurrentCategoryType(null));
							}}
						>
							New
						</Button>
					</Tooltip>
					<Tooltip title="Delete selected category types">
						<Button type="primary" disabled={selectedRowKeys.length === 0} danger onClick={handleDeleteMany}>
							Delete
						</Button>
					</Tooltip>
				</div>
				<div style={{ display: "flex" }}>
					<Form initialValues={{ searchBy: "name" }} form={form}>
						<Form.Item name="searchBy">
							<Select>
								<Select.Option value="name">Name</Select.Option>
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
				rowSelection={rowSelection}
				dataSource={categoryTypes.items.map((item: CategoryType, index: number) => ({
					...item,
					key: item.id,
				}))}
				pagination={{
					total: categoryTypes.count,
					pageSize,
					current: page,
					onChange: (page: number, pageSize: number) => {
						setPage(page);
						setPageSize(pageSize);
					},
					showSizeChanger: true,
					pageSizeOptions: [10, 50, 100, 200],
				}}
				loading={isLoading}
				columns={columns}
			/>
			{openModal && <ModalCategoryType visible={openModal} onCancel={() => setOpenModal(false)} />}
		</Paper>
	);
};
export default CategoryTypeList;
