import { Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { metaActions, metaState } from "redux/slice/meta";
interface Props {
	visible: boolean;
	onCancel: Function;
}

interface InitialValues {
	name: string;
	description: string;
}

const ModalMeta: React.FC<Props> = (props: Props) => {
	const { visible, onCancel } = props;

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const { accessToken } = useSelector(authState);
	const { metaList } = useSelector(metaState);
	const { current, isLoading } = metaList;

	const handleSubmit = (values: InitialValues) => {
		if (accessToken) {
			if (current) {
				dispatch(
					metaActions.updateMetaFetch({
						accessToken,
						dispatch,
						body: {
							id: current.id,
							...values,
						},
						afterSuccess: () => onCancel(),
					})
				);
			} else {
				dispatch(
					metaActions.addMetaFetch({
						accessToken,
						dispatch,
						body: values,
						afterSuccess: () => onCancel(),
					})
				);
			}
		}
	};

	return (
		<Modal
			visible={visible}
			onCancel={() => onCancel()}
			title={current ? "Edit meta" : "Add new meta"}
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
						description: current ? current.description : "",
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
				<Form.Item label="Description" name="description">
					<Input.TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default React.memo(ModalMeta);
