import { Avatar, Button, Col, Input, Row, Space, Table, Tag, Tree, message, Tooltip } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import config from "config";
import { STATUS_CODE, TABLE } from "constant";
import { useTitle } from "hooks/useTitle";
import { Category } from "interfaces/category";
import { Product } from "interfaces/product";
import { ProductCategory } from "interfaces/productCategory";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { categoryActions, categoryState } from "redux/slice/category";
import { productActions, productState } from "redux/slice/product.slice";
import { getURL } from "utils";
import styles from "./ProductCategoryPage.module.scss";
import * as productCategoryApi from "api/productCategoryApi";
import Paper from "components/Paper";

const cx: Function = classNames.bind(styles);
function treeData(list: Category[]): any {
	return list.map((item: Category) => {
		if (item.children && item.children.length > 0)
			return {
				key: item.id,
				title: item.title,
				children: treeData(item.children),
			};
		return {
			key: item.id,
			title: item.title,
		};
	});
}

const ProductCategoryPage = () => {
	useTitle(config.titles.productList);
	const { products, isLoading } = useSelector(productState);
	const { categories } = useSelector(categoryState);
	const { accessToken } = useSelector(authState);

	const dispatch = useDispatch();

	const [level] = React.useState<number>(3);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [checkedKeys, setCheckedKeys] = React.useState<React.Key[]>([]);
	const columns: ColumnsType<Product> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a: Product, b: Product) => a.name.length - b.name.length,
			render: (text: string, row: Product) => (
				<Space>
					{row.thumbnail && (
						<Avatar
							src={getURL(row.thumbnail)}
							alt=""
							shape="square"
							style={{
								width: TABLE.PRODUCT_WIDTH_THUMBNAIL,
								height: TABLE.PRODUCT_HEIGHT_THUMBNAIL,
							}}
						/>
					)}{" "}
					{text}
				</Space>
			),
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
	];

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const onCheck = (checkedKeysValue: any) => {
		setCheckedKeys(checkedKeysValue);
	};

	React.useEffect(() => {
		dispatch(productActions.getAllProductsFetch({}));
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(
			categoryActions.getAllCategoriesFetch({
				depth: level,
				sortType: "asc",
				parentId: "null",
			})
		);
	}, [dispatch, level]);

	// React.useEffect(() => {
	// 	setSelectedRowKeys([]);
	// }, [isLoadingDelete]);

	const rowSelection: TableRowSelection<Product> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};
	const handleSearch = (value: string) => {
		if (accessToken && value) {
			dispatch(
				productActions.searchProductFetch({
					accessToken,
					dispatch,
					params: { q: value },
				})
			);
		}
	};

	const handleCreate = async () => {
		const values: ProductCategory[] = [];
		selectedRowKeys.forEach((selected: any) => {
			checkedKeys.forEach((checked: any) => {
				values.push({
					productId: selected,
					categoryId: checked,
				});
			});
		});
		try {
			const res = await productCategoryApi.addManyProductCategory(accessToken, dispatch, values);
			if (res.status === STATUS_CODE.CREATED) {
				setCheckedKeys([]);
				setSelectedRowKeys([]);
				dispatch(productActions.getProductListFetch({}));
				message.success("Create product category success");
			}
		} catch (error) {
			message.error("Create product category failure");
		}
	};

	return (
		<>
			<Paper>
				<Row gutter={[8, 8]}>
					<Col xs={24}>
						<Row gutter={[8, 8]}>
							<Col xs={24} md={12}>
								<h2>Categories</h2>
								<Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData(categories.items)} />
							</Col>
							<Col xs={24} md={12} style={{ overflowX: "hidden" }}>
								<h2>Selected Products</h2>
								{products.items.map((item: Product, index: number) => {
									if (item.id && selectedRowKeys.includes(item.id))
										return (
											<Tag
												style={{
													marginBottom: 8,
													marginRight: 8,
												}}
												key={item.id}
												closable
												onClose={() => {
													setSelectedRowKeys([...selectedRowKeys].filter((ite: React.Key) => ite !== item.id));
												}}
												onClick={() => {
													setSelectedRowKeys([...selectedRowKeys].filter((ite: React.Key) => ite !== item.id));
												}}
											>
												{item.name}
											</Tag>
										);
									return "";
								})}
							</Col>
							<Col xs={24} style={{ textAlign: "center" }}>
								<Tooltip title="Create product category">
									<Button type="primary" onClick={handleCreate} disabled={checkedKeys.length === 0 || selectedRowKeys.length === 0}>
										Create
									</Button>
								</Tooltip>
							</Col>
						</Row>
					</Col>
					<Col xs={24}>
						<h2>All Products</h2>
						<div className={cx("buttons")}>
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
						<div>
							<Table
								rowSelection={rowSelection}
								dataSource={products.items.map((item: Product, index: number) => ({
									...item,
									key: item.id,
								}))}
								pagination={{
									total: products.count,
									pageSize: TABLE.PRODUCT_PAGE_SIZE,
								}}
								loading={isLoading}
								columns={columns}
							/>
						</div>
					</Col>
				</Row>
			</Paper>
		</>
	);
};

export default ProductCategoryPage;
