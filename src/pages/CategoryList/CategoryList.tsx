import { Avatar, Button, Form, Input, Popconfirm, Select, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { Category } from "interfaces/category";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { categoryActions, categoryState } from "redux/slice/category";
import styles from "./CategoryList.module.scss";
import ModalCategory from "./ModalCategory";

const cx: Function = classNames.bind(styles);

const CategoryList = () => {
	const { isLoadingDelete, listSearch, categories, isLoading } = useSelector(categoryState);
	const { accessToken } = useSelector(authState);
	const navigate = useNavigate();
	const columns: ColumnsType<Category> = [
		{
			title: "Thumbnail",
			dataIndex: "thumbnail",
			render: (text: string, row: Category) => <Avatar src={text} shape="square" alt="" style={{ width: 60, height: 60 }} />,
			width: 80,
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: (a: Category, b: Category) => a.title.length - b.title.length,
		},
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: Category, b: Category) => a.name.length - b.name.length,
		},
		{
			title: "Slug",
			dataIndex: "slug",
			sorter: (a: Category, b: Category) => a.slug.length - b.slug.length,
		},
		{
			title: "Type",
			dataIndex: "categoryType",
			sorter: (a: Category, b: Category): any => (a.parent ? a.parent.title : "Không có").length - (b.parent ? b.parent.title : "Không có").length,
			render: (text: string, row: Category) => row.categoryType?.name,
		},
		{
			title: "Parent",
			dataIndex: "parent",
			sorter: (a: Category, b: Category): any => (a.parent ? a.parent.title : "Không có").length - (b.parent ? b.parent.title : "Không có").length,
			render: (text: string, row: Category) => (row.parent ? row.parent.title : "Không có"),
		},
		{
			title: "Hành động",
			dataIndex: "operation",
			render: (text: string, row: Category) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								navigate(`${config.routes.categoryList}/edit/${row.id}`);
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
									categoryActions.deleteCategoryFetch({
										id: row.id,
										dispatch,
										accessToken,
										onDone: onDeleteDone,
									})
								);
							}
						}}
						okText="Yes"
						cancelText="No"
					>
						<Tooltip title="Delete" placement="bottom">
							<Button type="primary" danger size="small" icon={<AiOutlineDelete />} />
						</Tooltip>
					</Popconfirm>
				</>
			),
		},
	];

	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(
			categoryActions.getAllCategoriesFetch({
				depth: 1,
			})
		);
	}, [dispatch]);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [form] = Form.useForm();

	function onDeleteDone() {
		if (accessToken) {
			if (categories.items.length > 1) {
				dispatch(
					categoryActions.getAllCategoriesFetch({
						p: page,
						limit: pageSize,
					})
				);
			} else {
				setPage((prev) => (prev === 0 ? 0 : prev - 1));
			}
		}
	}
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	React.useEffect(() => {
		setSelectedRowKeys([]);
	}, [isLoadingDelete]);

	const rowSelection: TableRowSelection<Category> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const handleDeleteMany = () => {
		if (accessToken) {
			dispatch(
				categoryActions.deleteManyCategoryFetch({
					ids: selectedRowKeys,
					dispatch,
					accessToken,
				})
			);
		}
	};

	const handleSearch = (value: string) => {
		dispatch(
			categoryActions.getAllCategoriesFetch({
				p: page,
				limit: pageSize,
				...(value ? { [form.getFieldValue("searchBy")]: value } : {}),
			})
		);
	};

	return (
		<>
			<Paper>
				<div className={cx("buttons")}>
					<div>
						<Tooltip title="New">
							<Button
								type="primary"
								onClick={() => {
									// setOpenModal(true);
									navigate(config.routes.newCategory);
									// dispatch(categoryActions.getCurrentCategory(null));
								}}
							>
								Thêm danh mục
							</Button>
						</Tooltip>
						<Tooltip title="Xoá">
							<Button type="primary" disabled={selectedRowKeys.length === 0} danger onClick={handleDeleteMany}>
								Xoá
							</Button>
						</Tooltip>
						<Tooltip title="Tất cả danh mục">
							<Button type="default" disabled={listSearch.length === 0} onClick={() => dispatch(categoryActions.searchCategorySuccess([]))}>
								Tất cả danh mục
							</Button>
						</Tooltip>
					</div>
					<div style={{ display: "flex" }}>
						<Form initialValues={{ searchBy: "name" }} form={form}>
							<Form.Item name="searchBy">
								<Select>
									<Select.Option value="name">Name</Select.Option>
									<Select.Option value="title">Title</Select.Option>
									<Select.Option value="slug">Slug</Select.Option>
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
					dataSource={categories.items.map((item: Category) => ({
						...item,
						key: item.id,
					}))}
					pagination={{
						total: categories.count,
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
					expandable={{
						showExpandColumn: false,
					}}
				/>
			</Paper>
			{openModal && <ModalCategory visible={openModal} onCancel={() => setOpenModal(false)} />}
		</>
	);
};

export default CategoryList;
