import { Button, Form, Input } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import config from "~/config";
import * as authApi from "~/lib/api/authApi";
import { authActions, authState } from "~/redux/slices/authSlice";
import { setToken } from "~/utils";

interface InitialValues {
	email: string;
	password: string;
}

const initialValues = {
	email: "",
	password: "",
};

const Register: NextPage = () => {
	const { loading } = useSelector(authState);
	const router = useRouter();
	const dispatch = useDispatch();
	const onFinish = async (values: InitialValues) => {
		const { email, password } = values;
		try {
			dispatch(authActions.fetch());

			const res = await authApi.login({ email, password });

			console.log(res);
			if (res.status === 201) {
				dispatch(authActions.getProfile(res.data.user));
				setToken(res.data.accessToken);
				router.push(config.routes.home);
			}
		} catch (error) {
			dispatch(authActions.error());
		}
	};

	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(to bottom, purple, blue)",
			}}
		>
			<div style={{ width: 400, backgroundColor: "#fff", padding: 32 }}>
				<Head>
					<title>{config.titles.login}</title>
				</Head>
				<h1 style={{ textAlign: "center" }}>LOGIN</h1>
				<Form
					initialValues={initialValues}
					onFinish={onFinish}
					labelAlign="left"
					wrapperCol={{ span: 18 }}
					labelCol={{ span: 6 }}
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "This field is not empty",
							},
							{
								type: "email",
								message: "Email is incorrect",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "This field is not empty",
							},
							{
								min: 6,
								message: "Password must be least 6 characters",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<div style={{ textAlign: "center" }}>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							Login
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Register;
