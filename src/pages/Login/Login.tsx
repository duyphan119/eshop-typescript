import { Button, Form, Input } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "config";
import { authState, authActions } from "redux/slice/auth.slice";
import styles from "./Login.module.scss";
import { Login as LoginType } from "interfaces/auth";
import { useTitle } from "hooks/useTitle";

const cx: Function = classNames.bind(styles);

const Login: React.FC = () => {
	useTitle(config.titles.login);

	const { login } = useSelector(authState);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onFinish = (values: LoginType) => {
		dispatch(authActions.loginFetch({ body: values, navigate }));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<section className={cx("login-wrapper")}>
			<div className={cx("box")}>
				<h4>ĐĂNG NHẬP</h4>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ email: "", password: "" }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<div className="login-input">
						<Form.Item
							label="Địa chỉ email"
							name="email"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập email!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>
					<div style={{ marginBlock: 2 }}></div>
					<div className="login-input">
						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập password!",
								},
								{ min: 6, message: "Mật khẩu ít nhất 6 kí tự" },
							]}
						>
							<Input.Password />
						</Form.Item>
					</div>
					<div className={cx("links")}>
						<Link to="/">Quên mật khẩu</Link>
						<Link to={config.routes.register}>Đăng ký</Link>
					</div>
					<div className={cx("msg-error")}>{login.isError ? "Email hoặc mật khẩu không chính xác" : ""}</div>
					<div>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit" loading={login.isLoading}>
								Đăng nhập
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</section>
	);
};

export default Login;
