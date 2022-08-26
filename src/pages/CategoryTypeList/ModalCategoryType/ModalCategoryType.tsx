import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { categoryTypeActions, categoryTypeState } from "redux/slice/categoryType";
interface Props {
	visible: boolean;
	onCancel: Function;
}

interface InitialValues {
	name: string;
}

const ModalCategoryType: React.FC<Props> = (props: Props) => {
	const { visible, onCancel } = props;

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const { accessToken } = useSelector(authState);
	const { currentCategoryType: current, isLoading } = useSelector(categoryTypeState);
	const onDone = () => {
		if (current) {
			message.success("Updated Category Type");
			onCancel();
		} else {
			message.success("Created New Category Type");
			form.setFieldsValue({ name: "" });
		}
	};
	const handleSubmit = (values: InitialValues) => {
		if (accessToken) {
			if (current) {
				dispatch(
					categoryTypeActions.updateCategoryTypeFetch({
						accessToken,
						dispatch,
						data: values,
						onDone,
						id: current.id,
					})
				);
			} else {
				dispatch(
					categoryTypeActions.createCategoryTypeFetch({
						accessToken,
						dispatch,
						data: values,
						onDone,
					})
				);
			}
		}
	};

	return (
		<Modal
			visible={visible}
			onCancel={() => onCancel()}
			title={current ? "Edit category type" : "Add new category type"}
			okText={current ? "Edit" : "Add"}
			destroyOnClose={true}
			mask={false}
			onOk={form.submit}
			confirmLoading={isLoading}
		>
			<Form
				initialValues={
					{
						name: current ? current.name : "",
					} as InitialValues
				}
				form={form}
				onFinish={handleSubmit}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				labelAlign="left"
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default React.memo(ModalCategoryType);
