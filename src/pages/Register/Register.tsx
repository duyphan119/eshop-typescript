import { Button, Form, Input } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { authState, registerFetch } from "../../redux/slice/auth";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

const Register: React.FC = () => {
  const { isLoading, isError } = useSelector(authState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(registerFetch({ ...values, dispatch, navigate }));
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="register-input">
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập Họ tên!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="register-input">
            <Form.Item
              label="Địa chỉ email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
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
                { required: true, message: "Vui lòng nhập mật khẩu!" },
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
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Nhập lại mật khẩu không chính xác!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="register-input">
            <Form.Item
              name="telephone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
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
          <div className={cx("msg-error")}>
            {isError ? "Email hoặc mật khẩu không chính xác" : ""}
          </div>
          <div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
