import { Button, Col, Table } from "antd";
import React from "react";
import { ColumnsType } from "antd/lib/table/interface";
import { ProductOption, ProductOptionHasValue } from "interfaces/productOption";
import * as uploadApi from "api/uploadApi";
import { useDispatch, useSelector } from "react-redux";
import { productState } from "redux/slice/product.slice";
import { productOptionActions, productOptionState } from "redux/slice/productOption";
import { authState } from "redux/slice/auth.slice";
interface Props {
	productOptions: ProductOptionHasValue[];
	setProductOptions: React.Dispatch<React.SetStateAction<ProductOptionHasValue[]>>;
	files: File[];
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const GeneratedOptions: React.FC<Props> = (props: Props) => {
	const { productOptions, setProductOptions, files, setFiles } = props;

	const { productOption } = useSelector(productState);
	const { accessToken } = useSelector(authState);
	const { productOption: realProductOption } = useSelector(productOptionState);

	const dispatch = useDispatch();

	const afterSuccess = () => {
		setProductOptions([]);
	};

	const handleCreate = async () => {
		if (accessToken) {
			const result: ProductOptionHasValue[] = [];

			try {
				const formData = new FormData();

				files.forEach((file: File) => {
					formData.append("thumbnail", file);
				});

				const res = await uploadApi.uploadMany(formData);
				if (res.data) {
					productOption.selectedList.forEach((item: any) => {
						productOptions.forEach((el: any) => {
							const file = res.data.find((item: any) => item.originalname === el.file.name);
							result.push({
								title: el.title,
								productId: item.id,
								sku: item.id + el.sku,
								amount: el.amount,
								variantValueIds: el.variantValueIds,
								thumbnail: file.path || "",
								// file: el.file,
								weight: 50,
							});
						});
					});
					dispatch(
						productOptionActions.addManyProductOptionFetch({
							productOptions: result,
							accessToken,
							dispatch,
							afterSuccess,
						})
					);
				}
			} catch (error) {}
		}
	};

	const columnsOption: ColumnsType<ProductOption> = [
		{
			title: "Title",
			dataIndex: "title",
		},
		{
			title: "SKU (X: Product ID)",
			dataIndex: "sku",
			render: (text: string, row: ProductOption) => "X" + row.sku,
		},
		{
			title: "Amount",
			dataIndex: "amount",
			render: (text: string, row: ProductOption, index: number) => (
				<input
					value={row.amount}
					onChange={(e) => {
						const _options = [...productOptions];
						_options[index].amount = parseInt(e.target.value);
						setProductOptions(_options);
					}}
					type="number"
				/>
			),
		},
		{
			title: "Thumbnail",
			dataIndex: "thumbnail",
			render: (text: string, row: ProductOption, index: number) => (
				<>
					<input
						type="file"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								const index2 = files.findIndex(
									(item: File) =>
										e.target.files && e.target.files[0] && item.name === e.target.files[0].name && item.size === e.target.files[0].size
								);
								const _options = [...productOptions];
								_options[index].file = e.target.files[0];
								setProductOptions(_options);
								if (index2 === -1) {
									setFiles([...files, e.target.files[0]]);
								}
							}
						}}
					/>
				</>
			),
		},
	];
	return (
		<>
			<Col xs={24}>
				<h4>Generated options:</h4>
				<Table columns={columnsOption} dataSource={productOptions} pagination={false} />
			</Col>
			<Col xs={24} style={{ textAlign: "center", marginBlock: 8 }}>
				<Button
					type="primary"
					disabled={productOptions && (productOptions.length === 0 || productOption.selectedList.length === 0)}
					loading={realProductOption.isLoading}
					onClick={handleCreate}
				>
					Create options
				</Button>
			</Col>
		</>
	);
};

export default React.memo(GeneratedOptions);
