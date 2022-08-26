// import { Form, Input, Modal, Select } from "antd";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { authState } from "redux/slice/auth.slice";
// import { variantValueActions } from "redux/slice/variantValue";
// import { variantState } from "redux/slice/variant";
// import { variantValueState } from "redux/slice/variantValue";
// import { Variant } from "interfaces/variant";
// interface Props {
// 	onCancel: Function;
// 	visible: boolean;
// }
// interface InitialValuesType {
// 	name: string;
// 	variantIndex: number;
// }

// const ModalVariant: React.FC<Props> = (props: Props) => {
// 	const { onCancel, visible } = props;

// 	const dispatch = useDispatch();

// 	const { accessToken } = useSelector(authState);
// 	const { variantList } = useSelector(variantState);
// 	// const { variantValues } = useSelector(variantValueState);
// 	const [form] = Form.useForm();

// 	// React.useEffect(() => {
// 	// 	if (variantList.list.length > 0) {
// 	// 		const variantIndex = variantList.list.findIndex((item: Variant) => variantValueList.current && variantValueList.current.variantId === item.id);
// 	// 		if (variantIndex !== -1) {
// 	// 			form.setFieldsValue({
// 	// 				variantIndex: variantList.list.findIndex((item: Variant) => variantValueList.current && variantValueList.current.variantId === item.id),
// 	// 			});
// 	// 		}
// 	// 	}
// 	// }, [form, variantList.items, variantValues]);

// 	const onFinish = (values: InitialValuesType) => {
// 		if (accessToken) {
// 			const { variantIndex, ...others } = values;
// 			const variantId = variantList.list[variantIndex].id;
// 			if (variantId) {
// 				const reqData = {
// 					...others,
// 					accessToken,
// 					dispatch,
// 					afterSuccess: onCancel,
// 					variantId,
// 				};
// 				if (variantValueList.current) {
// 					dispatch(
// 						variantValueActions.updateVariantValueFetch({
// 							data: reqData,
// 							id: variantValueList.current.id,
// 							accessToken,
// 							dispatch,
// 						})
// 					);
// 				} else {
// 					dispatch(
// 						variantValueActions.createVariantValueFetch({
// 							data: reqData,
// 							accessToken,
// 							dispatch,
// 						})
// 					);
// 				}
// 			}
// 		}
// 	};

// 	return (
// 		<Modal
// 			onCancel={() => onCancel()}
// 			visible={visible}
// 			title={variantValueList.current ? "Edit variant value" : "Add new variant value"}
// 			destroyOnClose={true}
// 			mask={false}
// 			okText="Submit"
// 			cancelText="Close"
// 			onOk={form.submit}
// 			confirmLoading={variantValueList.isLoading}
// 		>
// 			{variantList.list.length === 0 ? (
// 				<div style={{ textAlign: "center" }}>No data variant</div>
// 			) : (
// 				<Form
// 					form={form}
// 					labelAlign="left"
// 					onFinish={onFinish}
// 					labelCol={{ span: 4 }}
// 					wrapperCol={{ span: 10 }}
// 					initialValues={{
// 						name: variantValueList.current ? variantValueList.current.name : "",
// 						variantIndex: 0,
// 					}}
// 				>
// 					<Form.Item label="Variant" name="variantIndex">
// 						<Select>
// 							{variantList.list.map((item: Variant, index: number) => (
// 								<Select.Option key={item.id} value={index}>
// 									{item.name}
// 								</Select.Option>
// 							))}
// 						</Select>
// 					</Form.Item>
// 					<Form.Item
// 						label="Value"
// 						name="name"
// 						rules={[
// 							{
// 								required: true,
// 								message: "This field is required!",
// 							},
// 						]}
// 					>
// 						<Input />
// 					</Form.Item>
// 				</Form>
// 			)}
// 		</Modal>
// 	);
// };

// export default React.memo(ModalVariant);
import React from "react";
interface Props {}
const ModalVariantValue: React.FC<Props> = (props: Props) => {
	return <></>;
};
export default ModalVariantValue;
