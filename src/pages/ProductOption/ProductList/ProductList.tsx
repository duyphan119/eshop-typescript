import { Avatar, Col, Space, Table } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { TABLE } from "constant";
import { Product } from "interfaces/product";
import { ProductOption } from "interfaces/productOption";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions, productState } from "redux/slice/product.slice";
import { getURL } from "utils";

const ProductList = () => {
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

	const { productOption } = useSelector(productState);

	const dispatch = useDispatch();

	const columns: ColumnsType<Product> = [
		{
			title: "Name",
			dataIndex: "name",
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
					<Space direction="vertical">
						<span style={{ fontWeight: "bold" }}>{text}</span>
						<span>
							{row.productOptions &&
								(row.productOptions.length === 0
									? "No options"
									: row.productOptions.map((item: ProductOption, index: number) => `${index === 0 ? "" : ", "}${item.title}`))}
						</span>
					</Space>
				</Space>
			),
		},
	];
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
		dispatch(
			productActions.getSelectedListProductOption(
				[...productOption.list].filter((item: Product) => newSelectedRowKeys.findIndex((id: React.Key) => id === item.id) !== -1)
			)
		);
	};

	const rowSelection: TableRowSelection<Product> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	return (
		<Col xs={24} md={12}>
			<h2>All products no options</h2>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={productOption.list.map((item: Product) => ({
					...item,
					key: item.id,
				}))}
				pagination={false}
			/>
		</Col>
	);
};

export default React.memo(ProductList);
