import { Button, Col, Row } from "antd";
// import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { useTitle } from "hooks/useTitle";
import { ProductOptionHasValue } from "interfaces/productOption";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { productActions } from "redux/slice/product.slice";
import { variantValueActions, variantValueState } from "redux/slice/variantValue";
import GeneratedOptions from "./GeneratedOptions";
import ProductList from "./ProductList";
// import styles from "./ProductOption.module.scss";
import SelectedProducts from "./SelectedProducts";
import SelectedVariantValues from "./SelectedVariantValues";

// const cx = classNames.bind(styles);
const ProductOptionPage: React.FC = () => {
	useTitle(config.titles.productOption);
	const dispatch = useDispatch();

	// const { productOption: variantValue } = useSelector(variantValueState);
	const { accessToken } = useSelector(authState);

	const [productOptions, setProductOptions] = React.useState<ProductOptionHasValue[]>([]);
	const [files, setFiles] = React.useState<File[]>([]);

	// React.useEffect(() => {
	// 	if (accessToken) {
	// 		dispatch(
	// 			productActions.getProductListProductOptionFetch({
	// 				params: { justNoOptions: true },
	// 				accessToken,
	// 				dispatch,
	// 			})
	// 		);
	// 		dispatch(
	// 			variantValueActions.getVariantValueListProductOptionFetch({
	// 				sortType: "asc",
	// 			})
	// 		);
	// 	}
	// }, [accessToken, dispatch]);

	// const generateOptions = () => {
	// 	const variant: any = {};
	// 	variantValue.selectedList.forEach((item: VariantValue) => {
	// 		if (item.variant) {
	// 			if (!variant[item.variant.name]) {
	// 				variant[item.variant.name] = {
	// 					items: [item],
	// 				};
	// 			} else {
	// 				variant[item.variant.name].items.push(item);
	// 			}
	// 		}
	// 	});

	// 	const keys = Object.keys(variant);
	// 	let result: any = [];
	// 	for (const key of keys) {
	// 		const resultKey = [];
	// 		for (const variantItem of variant[key].items) {
	// 			if (result.length === 0)
	// 				resultKey.push({
	// 					title: variantItem.name,
	// 					variantValueIds: [variantItem.id],
	// 					amount: 0,
	// 					key: variantItem.name,
	// 					sku: `${variantItem.id}`,
	// 				});
	// 			else {
	// 				result[result.length - 1].forEach((el: any) => {
	// 					resultKey.push({
	// 						...el,
	// 						title: el.title + " - " + variantItem.name,
	// 						key: el.title + " - " + variantItem.name,
	// 						variantValueIds: [...el.variantValueIds, variantItem.id],
	// 						sku: el.sku + variantItem.id,
	// 					});
	// 				});
	// 			}
	// 		}
	// 		result.push(resultKey);
	// 	}

	// 	setProductOptions(result[result.length - 1]);
	// };

	return (
		<Paper>
			<Row gutter={[16, 16]}>
				<Col xs={24} md={12}>
					<h2>Add new product options</h2>
					<Row>
						<SelectedVariantValues />
						<SelectedProducts />
						<Col xs={24} style={{ textAlign: "center", marginBlock: 8 }}>
							{/* <Button type="primary" onClick={generateOptions}>
								Generate options
							</Button> */}
						</Col>
						<GeneratedOptions files={files} setFiles={setFiles} productOptions={productOptions} setProductOptions={setProductOptions} />
					</Row>
				</Col>
				<ProductList />
			</Row>
		</Paper>
	);
};

export default ProductOptionPage;
