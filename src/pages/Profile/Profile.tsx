import { Col, Form, Input, notification, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authState } from "redux/slice/auth.slice";

interface Props {}

interface InitialValues {
	fullName: string;
	email: string;
	phone: string;
}
const Profile: React.FC<Props> = (props: Props) => {
	const fullNameId = React.useId();
	const phoneId = React.useId();
	const emailId = React.useId();

	const dispatch = useDispatch();

	const { me, accessToken, isLoading } = useSelector(authState);

	const onFinish = (values: InitialValues) => {
		if (accessToken) {
			dispatch(authActions.editProfileFetch({ accessToken, dispatch, data: { fullName: values.fullName }, onDone }));
		}
	};

	function onDone() {
		notification.success({ message: "Thông tin tài khoản đã được cập nhật" });
	}

	return (
		<div className="" style={{ marginBottom: 16 }}>
			<Row>
				<Col xs={24} md={12}>
					<Form
						initialValues={
							{
								fullName: me?.fullName || "",
								email: me?.email || "",
								phone: me?.phone || "",
							} as InitialValues
						}
						onFinish={onFinish}
					>
						<Form.Item className="form-control" label="Họ tên" name="fullName" htmlFor={fullNameId}>
							<Input id={fullNameId} />
						</Form.Item>
						<Form.Item className="form-control" label="Điện thoại" name="phone" htmlFor={phoneId} style={{ marginTop: 24 }}>
							<Input id={phoneId} disabled />
						</Form.Item>
						<Form.Item className="form-control" label="Email" name="email" htmlFor={emailId} style={{ marginTop: 24 }}>
							<Input id={emailId} disabled />
						</Form.Item>

						<button
							style={{
								backgroundColor: isLoading ? "lightgray" : "var(--primary-color)",
								border: `2px solid ${isLoading ? "lightgray" : "var(--primary-color)"}`,
								color: isLoading ? "darkgray" : "#fff",
								fontSize: 14,
								fontWeight: 700,
								padding: "12px 0",
								textAlign: "center",
								display: "block",
								width: "100%",
								marginTop: 32,
								cursor: "pointer",
							}}
							type="submit"
						>
							{isLoading ? "Đang lưu thông tin" : "Lưu"}
						</button>
					</Form>
				</Col>
			</Row>
		</div>
	);
};
export default Profile;
