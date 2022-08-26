import { Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { variantActions, variantState } from "redux/slice/variant";
interface Props {
	onCancel: Function;
	visible: boolean;
}
interface InitialValuesType {
	name: string;
}

const ModalVariant: React.FC<Props> = (props: Props) => {
	const { onCancel, visible } = props;

	const dispatch = useDispatch();

	const { accessToken } = useSelector(authState);
	const { isLoading, currentVariant: current } = useSelector(variantState);
	const [form] = Form.useForm();

	const onFinish = (values: InitialValuesType) => {
		if (accessToken) {
			const reqData = {
				...values,
				accessToken,
				dispatch,
				afterSuccess: onCancel,
			};
			if (current) {
				dispatch(
					variantActions.updateVariantFetch({
						data: reqData,
						id: current.id,
						accessToken,
						dispatch,
					})
				);
			} else {
				dispatch(
					variantActions.createVariantFetch({
						data: reqData,
						accessToken,
						dispatch,
					})
				);
			}
		}
	};

	return (
		<Modal
			onCancel={() => onCancel()}
			visible={visible}
			title={current ? "Edit variant" : "Add new variant"}
			destroyOnClose={true}
			mask={false}
			okText="Submit"
			cancelText="Close"
			onOk={form.submit}
			confirmLoading={isLoading}
		>
			<Form
				form={form}
				labelAlign="left"
				onFinish={onFinish}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				initialValues={{
					name: current ? current.name : "",
				}}
			>
				<Form.Item label="Name" name="name" rules={[{ required: true, message: "This field is required!" }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default React.memo(ModalVariant);
