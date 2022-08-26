import { Col, Form, Input, message, Modal, Row, Upload, UploadProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { API } from "constant";
import React from "react";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { userActions, userState } from "redux/slice/user";
interface Props {
	visible: boolean;
	onCancel: Function;
	onAddDone?: Function;
}

interface InitialValues {
	email: string;
	fullName: string;
	password?: string;
	phone: string;
	avatar: string;
}

const ModalUser: React.FC<Props> = (props: Props) => {
	const { visible, onCancel, onAddDone } = props;

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const { accessToken } = useSelector(authState);
	const { currentUser: current, isLoading } = useSelector(userState);

	const [imageUrl, setImageUrl] = React.useState<string>(current ? current.avatar : "");
	const [loading, setLoading] = React.useState(false);

	const initialValues: InitialValues = {
		fullName: current ? current.fullName : "",
		email: current ? current.email : "",
		phone: current ? current.phone : "",
		avatar: imageUrl,
		...(current ? {} : { password: "" }),
	};

	const handleSubmit = (values: InitialValues) => {
		const { email, fullName, phone } = values;
		if (accessToken) {
			if (current) {
				const reqData = { email, fullName, phone, avatar: imageUrl };
				dispatch(
					userActions.updateUserFetch({
						accessToken,
						dispatch,
						data: reqData,
						id: current.id,
						onDone,
					})
				);
			} else {
				dispatch(
					userActions.createUserFetch({
						accessToken,
						dispatch,
						data: { email, fullName, phone, password: values.password || "123456", avatar: imageUrl },
						onDone,
					})
				);
			}
		}
	};

	function onDone() {
		if (current) {
			message.success("Updated User");
			onCancel();
		} else {
			message.success("Created new User");
			form.setFieldsValue(initialValues);
			setImageUrl("");
			onAddDone && onAddDone();
		}
	}

	const uploadButton = (
		<div>
			{loading ? <AiOutlineLoading /> : <AiOutlinePlus />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true);
		}
		if (info.file.status === "done") {
			setLoading(false);
			setImageUrl(info.file.response);
		}
	};

	return (
		<Modal
			visible={visible}
			onCancel={() => onCancel()}
			title={current ? "Edit user" : "Add new user"}
			okText={current ? "Edit" : "Add"}
			destroyOnClose={true}
			mask={false}
			onOk={form.submit}
			confirmLoading={isLoading}
			width="80vw"
		>
			<Form initialValues={initialValues} form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} labelAlign="left">
				<Row gutter={[16, 16]}>
					<Col xs={24} lg={12}>
						<Form.Item
							label="Full name"
							name="fullName"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} lg={12}>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					{!current && (
						<Col xs={24} lg={12}>
							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<Input.Password />
							</Form.Item>
						</Col>
					)}
					<Col xs={24} lg={12}>
						<Form.Item
							label="Phone"
							name="phone"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} lg={12}>
						<Form.Item label="Avatar" name="avatar">
							<Upload
								name="file"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action={`${API.BASE_URL}/upload/user`}
								onChange={handleChange}
							>
								{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
							</Upload>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
export default React.memo(ModalUser);
