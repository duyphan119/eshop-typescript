import type { NextPage } from "next";
import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { authActions, authState } from "~/redux/slices/authSlice";
import config from "~/config";
import * as authApi from "~/lib/api/authApi";
import { setToken } from "~/utils";
import Head from "next/head";

interface InitialValues {
	email: string;
	fullName: string;
	password: string;
	cfPassword: string;
}

const initialValues = {
	email: "",
	fullName: "",
	password: "",
	cfPassword: "",
};

const Register: NextPage = () => {
	const { loading } = useSelector(authState);
	const router = useRouter();
	const dispatch = useDispatch();
	const onFinish = async (values: InitialValues) => {
		const { email, password, fullName } = values;
		try {
			dispatch(authActions.fetch());

			const res = await authApi.register({ email, password, fullName });

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
			<Head>
				<title>{config.titles.register}</title>
			</Head>
			<div style={{ width: 460, backgroundColor: "#fff", padding: 32 }}>
				<h1 style={{ textAlign: "center" }}>REGISTER</h1>
				<Form
					initialValues={initialValues}
					onFinish={onFinish}
					labelAlign="left"
					wrapperCol={{ span: 16 }}
					labelCol={{ span: 8 }}
				>
					<Form.Item
						name="fullName"
						label="Full Name"
						rules={[
							{
								required: true,
								message: "This field is not empty",
							},
						]}
					>
						<Input />
					</Form.Item>
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
					<Form.Item
						name="cfPassword"
						label="Confirm Password"
						rules={[
							{
								required: true,
								message: "This field is not empty",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"Confirm password is incorrect"
										)
									);
								},
							}),
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
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Register;
