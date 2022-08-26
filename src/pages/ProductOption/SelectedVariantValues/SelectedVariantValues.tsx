import { Button, Col, Tag } from "antd";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { variantValueActions, variantValueState } from "redux/slice/variantValue";
import ModalVariantValue from "../ModalVariantValue";

const SelectedVariantValues: React.FC = () => {
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	// const { productOption: variantValue } = useSelector(variantValueState);

	const dispatch = useDispatch();

	return (
		<Col xs={12}>
			<Button type="primary" onClick={() => setOpenModal(true)}>
				Select variant values
			</Button>
			<h4>Selected variant values:</h4>
			{/* {variantValue.selectedList.map((item: VariantValue, index: number) => (
        <Tag
          key={item.id}
          onClose={() => {
            dispatch(
              variantValueActions.getSelectedListProductOption(
                [...variantValue.selectedList].filter(
                  (el: VariantValue, ind: number) => ind !== index
                )
              )
            );
          }}
          closable
        >
          {item.variant?.name} - {item.name}
        </Tag>
      ))} */}
			{openModal && <ModalVariantValue visible={openModal} onCancel={() => setOpenModal(false)} />}
		</Col>
	);
};

export default React.memo(SelectedVariantValues);
