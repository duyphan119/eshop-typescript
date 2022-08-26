import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const Footer: React.FC = () => {
	return (
		<footer className={cx("footer") + " container"}>
			<Row gutter={[24, 24]}>
				<Col lg={8}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum quibusdam officia mollitia aliquid sapiente, possimus at illum
						iste impedit minima ex totam numquam, adipisci officiis, tenetur iure fugit? Nobis?
					</p>

					<div>ĐĂNG KÝ NHẬN THÔNG TIN</div>
					<div className={cx("register-wrapper")}>
						<input />
						<button>Đăng ký</button>
					</div>
				</Col>
				<Col lg={3}>
					<div className={cx("title")}>THƯƠNG HIỆU</div>
					<ul className={cx("list")}>
						<li className={cx("item")}>
							<Link to="/">Giới thiệu</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Tin tức</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Tuyển dụng</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Liên hệ</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Hệ thống cửa hàng</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Với cộng đồng</Link>
						</li>
					</ul>
				</Col>
				<Col lg={5}>
					<div className={cx("title")}>HỖ TRỢ</div>
					<ul className={cx("list")}>
						<li className={cx("item")}>
							<Link to="/">Hỏi đáp</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Chính sách KHTT</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Chính sách vận chuyển</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Hướng dẫn chọn size</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Kiểm tra đơn hàng</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Quy định đổi hàng</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Tra cứu điểm thẻ</Link>
						</li>
						<li className={cx("item")}>
							<Link to="/">Chính sách bảo mật</Link>
						</li>
					</ul>
				</Col>
				<Col lg={8}></Col>
			</Row>
		</footer>
	);
};

export default React.memo(Footer);
