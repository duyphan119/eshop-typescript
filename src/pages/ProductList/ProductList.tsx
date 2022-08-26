import { Avatar, Button, Form, Input, Popconfirm, Select, Space, Table, Tooltip } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { TABLE } from "constant";
import { useTitle } from "hooks/useTitle";
import { Product } from "interfaces/product";
import { ProductCategory } from "interfaces/productCategory";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { productActions, productState } from "redux/slice/product.slice";
import { getURL } from "utils";
import ModalProduct from "./ModalProduct";
import styles from "./ProductList.module.scss";

const cx: Function = classNames.bind(styles);
const ProductList = () => {
	useTitle(config.titles.productList);
	const { products, isLoading } = useSelector(productState);
	const { accessToken } = useSelector(authState);

	const dispatch = useDispatch();

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [form] = Form.useForm();
	const columns: ColumnsType<Product> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: Product, b: Product) => a.name.length - b.name.length,
			render: (text: string, row: Product) => (
				<Space>
					<Avatar
						src={getURL(row.thumbnail)}
						alt=""
						shape="square"
						style={{
							width: TABLE.PRODUCT_WIDTH_THUMBNAIL,
							height: TABLE.PRODUCT_HEIGHT_THUMBNAIL,
						}}
					/>{" "}
					{text}
				</Space>
			),
		},
		{
			title: "Price",
			dataIndex: "price",
			sorter: (a: Product, b: Product) => a.price - b.price,
			render: (text: string, row: Product) => (
				<Space direction="vertical">
					<div style={{ textDecoration: row.newPrice > 0 ? "line-through" : "none", color: row.newPrice > 0 ? "gray" : "#000" }}>{row.price}</div>
					{row.newPrice > 0 && <div>{row.newPrice}</div>}
				</Space>
			),
		},
		{
			title: "Slug",
			dataIndex: "slug",
			sorter: (a: Product, b: Product) => a.slug.length - b.slug.length,
		},
		{
			title: "Categories",
			dataIndex: "productCategories",
			render: (text: string, row: Product) => (
				<div>
					{row.categories && row.categories.map((value: ProductCategory, index: number) => `${index !== 0 ? ", " : ""}${value.category?.name}`)}
				</div>
			),
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: Product) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(productActions.getCurrentProduct(row));
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
									productActions.deleteProductFetch({
										id: row.id,
										dispatch,
										accessToken,
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
			if (products.items.length > 1) {
				dispatch(
					productActions.getAllProductsFetch({
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
		dispatch(
			productActions.getAllProductsFetch({
				p: page,
				limit: pageSize,
			})
		);
	}, [dispatch, page, pageSize]);

	const rowSelection: TableRowSelection<Product> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	const handleDeleteMany = () => {
		if (accessToken) {
			dispatch(
				productActions.deleteManyProductsFetch({
					ids: selectedRowKeys,
					dispatch,
					accessToken,
				})
			);
		}
	};
	const handleSearch = (value: string) => {
		if (value && accessToken) {
			dispatch(
				productActions.searchProductFetch({
					accessToken,
					dispatch,
					params: { q: value },
				})
			);
		}
	};

	return (
		<>
			<Paper>
				<div className={cx("buttons")}>
					<div>
						<Tooltip title="New product">
							<Button
								type="primary"
								onClick={() => {
									setOpenModal(true);
									// dispatch(productActions.getCurrentProduct(null));
								}}
							>
								New
							</Button>
						</Tooltip>
						<Tooltip title="Delete selected products">
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
									<Select.Option value="slug">Slug</Select.Option>
									<Select.Option value="price">Price</Select.Option>
									<Select.Option value="newPrice">New Price</Select.Option>
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
					dataSource={products.items.map((item: Product, index: number) => ({
						...item,
						key: item.id,
					}))}
					pagination={{
						total: products.count,
						pageSize: pageSize,
						current: page,
						showSizeChanger: true,
						pageSizeOptions: [10, 50, 100, 200],
						onChange: (page: number, pageSize: number) => {
							setPage(page);
							setPageSize(pageSize);
						},
					}}
					loading={isLoading}
					columns={columns}
				/>
			</Paper>
			{openModal && <ModalProduct visible={openModal} onCancel={() => setOpenModal(false)} />}
		</>
	);
};

export default ProductList;
