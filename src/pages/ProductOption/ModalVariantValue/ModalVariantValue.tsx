import { Checkbox, Col, Modal, Row } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { variantValueActions, variantValueState } from "redux/slice/variantValue";
interface Props {
	onCancel: Function;
	visible: boolean;
}

const ModalProduct: React.FC<Props> = (props: Props) => {
	const { visible, onCancel } = props;

	// const { productOption } = useSelector(variantValueState);

	const dispatch = useDispatch();

	const [checkedItems, setCheckedItems] = React.useState<CheckboxValueType[]>([]);

	const onChange = (checkedValues: CheckboxValueType[]) => {
		setCheckedItems(checkedValues);
	};

	// const handleOk = () => {
	//   dispatch(
	//     variantValueActions.getSelectedListProductOption(
	//       [...productOption.list].filter(
	//         (item: VariantValue) =>
	//           checkedItems.findIndex(
	//             (id: CheckboxValueType) => id === item.id
	//           ) !== -1
	//       )
	//     )
	//   );
	//   onCancel();
	// };

	return (
		<Modal
			onCancel={() => onCancel()}
			visible={visible}
			title="Select variant value"
			destroyOnClose={true}
			mask={false}
			// onOk={handleOk}
			// confirmLoading={productOption.isLoading}
		>
			{/* {productOption.list.length === 0 ? (
        <div>No data</div>
      ) : ( 
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          <Row gutter={[8, 8]}>
            {productOption.list.map((item: VariantValue) => (
              <Col key={item.id} span={8}>
                <Checkbox value={item.id}>
                  {item.variant?.name} - {item.name}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}*/}
		</Modal>
	);
};

export default React.memo(ModalProduct);
