import { Button, Form, Input } from "antd";
import classNames from "classnames/bind";
import config from "config";
import { useTitle } from "hooks/useTitle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions, authState } from "redux/slice/auth.slice";
import styles from "./Register.module.scss";

const cx: Function = classNames.bind(styles);

interface InitialValues {
	fullName: string;
	phone: string;
	password: string;
	confirmPassword: string;
	email: string;
}

const initialValues: InitialValues = {
	email: "",
	password: "",
	fullName: "",
	phone: "",
	confirmPassword: "",
};

const Register: React.FC = () => {
	useTitle(config.titles.register);
	const { register } = useSelector(authState);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onFinish = (values: InitialValues) => {
		const { confirmPassword, ...body } = values;
		dispatch(authActions.registerFetch({ body, navigate }));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<section className={cx("register-wrapper")}>
			<div className={cx("box")}>
				<h4>ĐĂNG KÝ</h4>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={initialValues}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<div className="register-input">
						<Form.Item
							label="Họ Tên"
							name="fullName"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Họ Tên!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>
					<div className="register-input">
						<Form.Item
							label="Địa chỉ email"
							name="email"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập email!",
								},
								{
									type: "email",
									message: "Địa chỉ email không hợp lệ!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>
					<div style={{ marginBlock: 2 }}></div>
					<div className="register-input">
						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập mật khẩu!",
								},
								{ min: 6, message: "Mật khẩu ít nhất 6 kí tự" },
							]}
						>
							<Input.Password />
						</Form.Item>
					</div>
					<div className="register-input">
						<Form.Item
							label="Nhập lại mật khẩu"
							name="confirmPassword"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập lại mật khẩu!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Nhập lại mật khẩu không chính xác!"));
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
					</div>
					<div className="register-input">
						<Form.Item
							name="phone"
							label="Số điện thoại"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập số điện thoại!",
								},
								{
									pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
									message: "Số điện thoại không hợp lệ!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>
					<div className={cx("links")}>
						<Link to={config.routes.login}>Đăng nhập</Link>
					</div>
					<div className={cx("msg-error")}>{register.isError ? "Email hoặc mật khẩu không chính xác" : ""}</div>
					<div>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit" loading={register.isLoading}>
								Đăng ký
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</section>
	);
};

export default Register;
