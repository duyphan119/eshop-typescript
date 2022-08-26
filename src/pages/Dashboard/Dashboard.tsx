import { Avatar, Col, Rate, Row, Space, Table, Tag } from "antd";
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { DASHBOARD_LAYOUT } from "constant";
import { useTitle } from "hooks/useTitle";
import {
	AiOutlineDollar,
	AiOutlineReconciliation,
	AiOutlineStar,
	AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ChartRevenueToday from "./ChartRevenueToday";
import CountOrderByCategoryProductPage from "./CountOrderByCategoryProductPage";
import styles from "./Dashboard.module.scss";
import Widget from "./Widget";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement,
	ArcElement
);
const cx: Function = classNames.bind(styles);
const dataSource = [
	{
		key: "1",
		fullName: "Phan Khánh Duy",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981196",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 330000,
		orderStatus: {
			title: "Đang xử lý",
			allowCancel: true,
			isCompleted: false,
		},
	},
	{
		key: "2",
		fullName: "Nguyễn Thị Thu Hương",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981197",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 360000,
		orderStatus: {
			title: "Đang xử lý",
			allowCancel: true,
			isCompleted: false,
		},
	},
	{
		key: "3",
		fullName: "Nguyễn Thị Thu Hương",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981197",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 360000,
		orderStatus: {
			title: "Đang giao",
			allowCancel: false,
			isCompleted: false,
		},
	},
	{
		key: "4",
		fullName: "Nguyễn Thị Thu Hương",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981197",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 360000,
		orderStatus: {
			title: "Đang giao",
			allowCancel: false,
			isCompleted: false,
		},
	},
	{
		key: "5",
		fullName: "Nguyễn Thị Thu Hương",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981197",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 360000,
		orderStatus: {
			title: "Đã giao",
			allowCancel: false,
			isCompleted: true,
		},
	},
	{
		key: "6",
		fullName: "Nguyễn Thị Thu Hương",
		address: "115/20 Hoàng Hoa Thám",
		telephone: "0385981197",
		city: "Tỉnh Long An",
		district: "Thành phố Tân An",
		ward: "Phường 2",
		totalPrice: 360000,
		orderStatus: {
			title: "Đã giao",
			allowCancel: false,
			isCompleted: true,
		},
	},
];
const dataSource2 = [
	{
		key: "1",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
	{
		key: "2",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
	{
		key: "13",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
	{
		key: "3",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
	{
		key: "4",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
	{
		key: "5",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		color: {
			title: "Xanh lục",
		},
		size: {
			title: "M",
		},
		count: 3,
	},
];
const dataSource3 = [
	{
		key: "1",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		user: {
			fullName: "Nguyễn Thị Thu Hương",
		},
		content:
			"Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương",
		rate: 3,
	},
	{
		key: "2",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		user: {
			fullName: "Nguyễn Thị Thu Hương",
		},
		content:
			"Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương",
		rate: 3,
	},
	{
		key: "3",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		user: {
			fullName: "Nguyễn Thị Thu Hương",
		},
		content:
			"Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương",
		rate: 3,
	},
	{
		key: "4",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		user: {
			fullName: "Nguyễn Thị Thu Hương",
		},
		content:
			"Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương",
		rate: 3,
	},
	{
		key: "5",
		amount: 0,
		product: {
			name: "product 1",
			price: 300000,
		},
		user: {
			fullName: "Nguyễn Thị Thu Hương",
		},
		content:
			"Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương Nguyễn Thị Thu Hương",
		rate: 3,
	},
];
const columns3 = [
	{
		title: "Người dùng",
		dataIndex: "user",
		key: "user",
		render: (text: any, row: any) => (
			<Space>
				<Avatar
					src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
					alt=""
					shape="square"
					size="large"
				/>
				{row.user.fullName}
			</Space>
		),
	},
	{
		title: "Nội dung",
		dataIndex: "content",
		key: "content",
		render: (text: any, row: any) => (
			<div className="three-dot three-dot-2">{row.content}</div>
		),
	},
	{
		title: "Đánh giá",
		dataIndex: "rate",
		key: "rate",
		render: (text: any, row: any) => (
			<Rate
				allowHalf
				disabled
				defaultValue={5}
				className="stars-top-product"
			/>
		),
	},
	{
		title: "Sản phẩm",
		dataIndex: "product.name",
		key: "product.name",
		render: (text: any, row: any) => (
			<Avatar
				src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
				alt=""
				shape="square"
				size="large"
			/>
		),
	},
];
const columns2 = [
	{
		title: "Sản phẩm",
		dataIndex: "product.name",
		key: "product.name",
		render: (text: any, row: any) => (
			<Space>
				<Avatar
					src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
					alt=""
					shape="square"
					size="large"
				/>
				{row.product.name}
			</Space>
		),
	},
	{
		title: "Chi tiết",
		dataIndex: "detail",
		key: "detail",
		render: (text: any, row: any) =>
			`${row.color.title} / ${row.size.title}`,
	},
	{
		title: "Giá",
		dataIndex: "product.price",
		key: "product.price",
		render: (text: any, row: any) => `${row.product.price} `,
	},
	{
		title: "Tồn kho",
		dataIndex: "amount",
		key: "amount",
		render: (text: any, row: any) => `${row.amount} `,
	},
	{
		title: "Đã bán",
		dataIndex: "count",
		key: "count",
		render: (text: any, row: any) => `${row.count}`,
	},
];
const columns = [
	{
		title: "Họ tên",
		dataIndex: "fullName",
		key: "fullName",
	},
	{
		title: "Điện thoại",
		dataIndex: "telephone",
		key: "telephone",
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
		render: (text: any, row: any) =>
			`${row.address} ${row.ward}, ${row.district}, ${row.city}`,
	},
	{
		title: "Tổng tiền",
		dataIndex: "totalPrice",
		key: "totalPrice",
		render: (text: any, row: any) => `${row.totalPrice}`,
	},
	{
		title: "Trạng thái",
		dataIndex: "status",
		key: "status",
		render: (text: any, row: any) => {
			let color = row.orderStatus.isCompleted
				? "green"
				: !row.orderStatus.allowCancel
				? "var(--primary-color)"
				: "";
			return (
				<Tag color={color}>{row.orderStatus.title.toUpperCase()}</Tag>
			);
		},
	},
];
const Dashboard = () => {
	useTitle(config.titles.dashboard);

	return (
		<main className={cx("main")}>
			<Row gutter={[16, 16]}>
				<Col lg={6} md={12} xs={24}>
					<Widget
						cx={cx}
						name="Order"
						compare={`Inc ${10}%`}
						rate="inc"
						value={100}
						icon={<AiOutlineReconciliation />}
					/>
				</Col>
				<Col lg={6} md={12} xs={24}>
					<Widget
						cx={cx}
						name="Revenue"
						compare={`Inc ${10}%`}
						rate="inc"
						value={"23.100.000 ₫"}
						icon={<AiOutlineDollar />}
					/>
				</Col>
				<Col lg={6} md={12} xs={24}>
					<Widget
						cx={cx}
						name="User"
						compare={`Desc ${10}%`}
						rate="desc"
						value={100}
						icon={<AiOutlineUser />}
					/>
				</Col>
				<Col lg={6} md={12} xs={24}>
					<Widget
						cx={cx}
						name="Voting"
						compare={`Desc ${10}%`}
						rate="desc"
						value={100}
						icon={<AiOutlineStar />}
					/>
				</Col>
				<Col lg={6} xs={24}>
					<Paper>
						<h4>Doanh thu hôm nay</h4>
						<div
							style={{
								height: DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT,
							}}
							className={cx("revenue-today")}
						>
							<div>23.100.000₫</div>
						</div>
					</Paper>
				</Col>
				<Col lg={12} xs={24}>
					<Paper>
						<h4>Chart revenue today</h4>
						<ChartRevenueToday
							labels={[
								"0 - 3h",
								"3 - 6h",
								"6 - 9h",
								"9 - 12h",
								"12 - 15h",
								"15 - 18h",
								"18 - 21h",
								"21 - 24h",
							]}
							data={[
								200000, 120000, 150000, 180000, 230000, 210000,
								100000, 170000,
							]}
							label="Revenue each 3 hours"
						/>
					</Paper>
				</Col>
				<Col lg={6} xs={24}>
					<Paper>
						<h4>Count order by category product page</h4>
						<CountOrderByCategoryProductPage
							data={[20, 30, 50]}
							label="Category"
							labels={["Men", "Women", "Kid"]}
						/>
					</Paper>
				</Col>
				<Col xl={18} xs={24}>
					<Paper
						style={{
							minHeight: DASHBOARD_LAYOUT.RECENT_ORDERS_HEIGHT,
						}}
					>
						<h4>Đơn hàng gần đây</h4>
						<Table
							pagination={false}
							dataSource={dataSource}
							columns={columns}
							size="small"
						/>
						<Link to="/" className={cx("view-more")}>
							Tất cả đơn hàng
						</Link>
					</Paper>
				</Col>
				<Col xl={6} xs={24}>
					<Paper
						style={{
							minHeight: DASHBOARD_LAYOUT.RECENT_ORDERS_HEIGHT,
						}}
					>
						<h4>Sản phẩm tốt</h4>
						<div className={cx("top-products")}>
							<div className={cx("product")}>
								<div className={cx("product-left")}>
									<Avatar
										src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
										alt=""
										shape="square"
										size="large"
									/>
								</div>
								<div className={cx("product-right")}>
									<div
										className={
											"three-dot three-dot-1 " +
											cx("product-name")
										}
									>
										Lorem ipsum dolor sit amet consectetur
									</div>
									<Rate
										allowHalf
										disabled
										defaultValue={5}
										className="stars-top-product"
									/>
								</div>
							</div>
							<div className={cx("product")}>
								<div className={cx("product-left")}>
									<Avatar
										src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
										alt=""
										shape="square"
										size="large"
									/>
								</div>
								<div className={cx("product-right")}>
									<div
										className={
											"three-dot three-dot-1 " +
											cx("product-name")
										}
									>
										Lorem ipsum dolor sit amet consectetur
									</div>
									<Rate
										allowHalf
										disabled
										defaultValue={5}
										className="stars-top-product"
									/>
								</div>
							</div>
							<div className={cx("product")}>
								<div className={cx("product-left")}>
									<Avatar
										src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
										alt=""
										shape="square"
										size="large"
									/>
								</div>
								<div className={cx("product-right")}>
									<div
										className={
											"three-dot three-dot-1 " +
											cx("product-name")
										}
									>
										Lorem ipsum dolor sit amet consectetur
									</div>
									<Rate
										allowHalf
										disabled
										defaultValue={5}
										className="stars-top-product"
									/>
								</div>
							</div>
							<div className={cx("product")}>
								<div className={cx("product-left")}>
									<Avatar
										src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
										alt=""
										shape="square"
										size="large"
									/>
								</div>
								<div className={cx("product-right")}>
									<div
										className={
											"three-dot three-dot-1 " +
											cx("product-name")
										}
									>
										Lorem ipsum dolor sit amet consectetur
									</div>
									<Rate
										allowHalf
										disabled
										defaultValue={5}
										className="stars-top-product"
									/>
								</div>
							</div>
							<div className={cx("product")}>
								<div className={cx("product-left")}>
									<Avatar
										src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/294388117_636701584835747_785248990364797182_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=gUe_GqsZuncAX-DAcVK&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-YJX2WhLUCpfbvkrT9Ob3oynoqpNvKZk8uSir8luoS2w&oe=62E3563F"
										alt=""
										shape="square"
										size="large"
									/>
								</div>
								<div className={cx("product-right")}>
									<div
										className={
											"three-dot three-dot-1 " +
											cx("product-name")
										}
									>
										Lorem ipsum dolor sit amet consectetur
									</div>
									<Rate
										allowHalf
										disabled
										defaultValue={5}
										className="stars-top-product"
									/>
								</div>
							</div>
						</div>
						<Link to="/" className={cx("view-more")}>
							Tất cả sản phẩm
						</Link>
					</Paper>
				</Col>
				<Col xl={12} xs={24}>
					<Paper
						style={{ height: DASHBOARD_LAYOUT.BEST_SELLER_HEIGHT }}
					>
						<h4>6 sản phẩm bán chạy nhất</h4>
						<Table
							pagination={false}
							dataSource={dataSource2}
							columns={columns2}
							size="small"
						/>
						<div style={{ marginTop: 32 }}></div>
						<Link to="/" className={cx("view-more")}>
							Tất cả chi tiết sản phẩm
						</Link>
					</Paper>
				</Col>
				<Col xl={12} xs={24}>
					<Paper
						style={{ height: DASHBOARD_LAYOUT.BEST_SELLER_HEIGHT }}
					>
						<h4>Đánh giá gần đây</h4>
						<Table
							pagination={false}
							dataSource={dataSource3}
							columns={columns3}
							size="small"
						/>
						<div style={{ marginTop: 32 }}></div>
						<Link to="/" className={cx("view-more")}>
							Tất cả đánh giá
						</Link>
					</Paper>
				</Col>
			</Row>
		</main>
	);
};

export default Dashboard;
