import { Col, Tag } from "antd";
import { Product } from "interfaces/product";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions, productState } from "redux/slice/product.slice";

const SelectedProducts: React.FC = () => {
	const { productOption } = useSelector(productState);
	const dispatch = useDispatch();
	return (
		<Col xs={12}>
			<h4>Selected products:</h4>
			{productOption.selectedList.map((item: Product, index: number) => (
				<Tag
					key={item.id}
					onClose={() => {
						dispatch(
							productActions.getSelectedListProductOption([...productOption.selectedList].filter((el: Product, ind: number) => ind !== index))
						);
					}}
					closable
				>
					{item.name}
				</Tag>
			))}
		</Col>
	);
};

export default React.memo(SelectedProducts);
