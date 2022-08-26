import { Button, Col, Row } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./SectionNews.module.scss";
interface Props {}
const cx = classNames.bind(styles);

const SectionNews: React.FC<Props> = (props: Props) => {
	return (
		<section style={{ marginTop: 56 }}>
			<h2>#canifalife</h2>
			<Row gutter={[16, 16]}>
				<Col xs={12} md={8}>
					<Link to="/" style={{ display: "block" }}>
						<img src="https://media.canifa.com/mageplaza/blog/post/a/o/ao-gio-3-giay-4-can-canifa-1_1.jpeg" width="100%" alt="" />
					</Link>
					<Link to="/" className="three-dot three-dot-2" style={{ color: "#000", fontWeight: 600, margin: "16px 0", height: 44 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque officia illum, dolor dolorum odit sequi facilis quae consequuntur
						recusandae iste eum ratione expedita, quam ea obcaecati tempora facere, accusamus ipsum?
					</Link>
					<div style={{ color: "gray" }}>19:08 22/11/2022</div>
				</Col>
				<Col xs={12} md={8}>
					<Link to="/" style={{ display: "block" }}>
						<img src="https://media.canifa.com/mageplaza/blog/post/a/o/ao-gio-3-giay-4-can-canifa-1_1.jpeg" width="100%" alt="" />
					</Link>
					<Link to="/" className="three-dot three-dot-2" style={{ color: "#000", fontWeight: 600, margin: "16px 0", height: 44 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque officia illum, dolor dolorum odit sequi facilis quae consequuntur
						recusandae iste eum ratione expedita, quam ea obcaecati tempora facere, accusamus ipsum?
					</Link>
					<div style={{ color: "gray" }}>19:08 22/11/2022</div>
				</Col>
				<Col xs={12} md={8}>
					<Link to="/" style={{ display: "block" }}>
						<img src="https://media.canifa.com/mageplaza/blog/post/a/o/ao-gio-3-giay-4-can-canifa-1_1.jpeg" width="100%" alt="" />
					</Link>
					<Link to="/" className="three-dot three-dot-2" style={{ color: "#000", fontWeight: 600, margin: "16px 0", height: 44 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque officia illum, dolor dolorum odit sequi facilis quae consequuntur
						recusandae iste eum ratione expedita, quam ea obcaecati tempora facere, accusamus ipsum?
					</Link>
					<div style={{ color: "gray" }}>19:08 22/11/2022</div>
				</Col>
				<Col xs={24}>
					<div style={{ textAlign: "center", margin: "40px 0" }}>
						<Button type="default" size="large">
							Xem thêm
						</Button>
					</div>
				</Col>
			</Row>
		</section>
	);
};
export default SectionNews;
