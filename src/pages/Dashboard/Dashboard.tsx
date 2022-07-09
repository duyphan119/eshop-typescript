import React from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { Avatar, Col, Rate, Row, Space, Table, Tag } from "antd";
import {
  DollarOutlined,
  ReconciliationOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { DASHBOARD_LAYOUT } from "../../constants";
import { Link } from "react-router-dom";

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
const cx = classNames.bind(styles);
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
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
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
      <Rate allowHalf disabled defaultValue={5} className="stars-top-product" />
    ),
  },
  {
    title: "Sản phẩm",
    dataIndex: "product.name",
    key: "product.name",
    render: (text: any, row: any) => (
      <Avatar
        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
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
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
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
    render: (text: any, row: any) => `${row.color.title} / ${row.size.title}`,
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
      return <Tag color={color}>{row.orderStatus.title.toUpperCase()}</Tag>;
    },
  },
];
const Dashboard = () => {
  return (
    <main className={cx("main")}>
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} xs={24}>
          <div className={cx("widget")}>
            <Space direction="vertical">
              <span className={cx("widget-title")}>Đơn hàng</span>
              <span className={cx("widget-value")}>100</span>
              <span className={`${cx("widget-compare")} ${cx("up")}`}>
                Tăng 10%
              </span>
            </Space>
            <span className={cx("widget-icon")}>
              <ReconciliationOutlined />
            </span>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className={cx("widget")}>
            <Space direction="vertical">
              <span className={cx("widget-title")}>Doanh thu</span>
              <span className={cx("widget-value")}>23.100.000 đ</span>
              <span className={`${cx("widget-compare")} ${cx("up")}`}>
                Tăng 10%
              </span>
            </Space>
            <span className={cx("widget-icon")}>
              <DollarOutlined />
            </span>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className={cx("widget")}>
            <Space direction="vertical">
              <span className={cx("widget-title")}>Người dùng</span>
              <span className={cx("widget-value")}>100</span>
              <span className={`${cx("widget-compare")} ${cx("down")}`}>
                Giảm 10%
              </span>
            </Space>
            <span className={cx("widget-icon")}>
              <UserOutlined />
            </span>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className={cx("widget")}>
            <Space direction="vertical">
              <span className={cx("widget-title")}>Đánh giá</span>
              <span className={cx("widget-value")}>100</span>
              <span className={`${cx("widget-compare")} ${cx("up")}`}>
                Tăng 10%
              </span>
            </Space>
            <span className={cx("widget-icon")}>
              <StarOutlined />
            </span>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div className={cx("paper")}>
            <h4>Doanh thu hôm nay</h4>
            <div
              style={{ height: DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT }}
              className={cx("revenue-today")}
            >
              <div>23.100.000đ</div>
            </div>
          </div>
        </Col>
        <Col lg={12} xs={24}>
          <div className={cx("paper")}>
            <h4>Biểu đồ doanh thu hôm nay</h4>
            <div>
              <Bar
                height={DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT}
                data={{
                  labels: [
                    "0 - 3h",
                    "3 - 6h",
                    "6 - 9h",
                    "9 - 12h",
                    "12 - 15h",
                    "15 - 18h",
                    "18 - 21h",
                    "21 - 24h",
                  ],
                  datasets: [
                    {
                      label: "Danh thu theo giờ",
                      data: [
                        200000, 120000, 150000, 180000, 230000, 210000, 100000,
                        170000,
                      ],
                      backgroundColor: "#0092ff",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {},
                }}
              />
            </div>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div className={cx("paper")}>
            <h4>Số đơn hàng theo danh mục</h4>
            <div>
              <Pie
                height={DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT}
                data={{
                  labels: ["Nam", "Nữ", "Trẻ em"],
                  datasets: [
                    {
                      label: "Danh mục",
                      data: [20, 30, 50],
                      backgroundColor: ["#0092ff", "#1f92af", "#01faff"],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {},
                }}
              />
            </div>
          </div>
        </Col>
        <Col xl={18} xs={24}>
          <div
            className={cx("paper")}
            style={{ minHeight: DASHBOARD_LAYOUT.RECENT_ORDERS_HEIGHT }}
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
          </div>
        </Col>
        <Col xl={6} xs={24}>
          <div
            className={cx("paper")}
            style={{ minHeight: DASHBOARD_LAYOUT.RECENT_ORDERS_HEIGHT }}
          >
            <h4>Sản phẩm tốt</h4>
            <div className={cx("top-products")}>
              <div className={cx("product")}>
                <div className={cx("product-left")}>
                  <Avatar
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                    alt=""
                    shape="square"
                    size="large"
                  />
                </div>
                <div className={cx("product-right")}>
                  <div
                    className={"three-dot three-dot-1 " + cx("product-name")}
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
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                    alt=""
                    shape="square"
                    size="large"
                  />
                </div>
                <div className={cx("product-right")}>
                  <div
                    className={"three-dot three-dot-1 " + cx("product-name")}
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
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                    alt=""
                    shape="square"
                    size="large"
                  />
                </div>
                <div className={cx("product-right")}>
                  <div
                    className={"three-dot three-dot-1 " + cx("product-name")}
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
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                    alt=""
                    shape="square"
                    size="large"
                  />
                </div>
                <div className={cx("product-right")}>
                  <div
                    className={"three-dot three-dot-1 " + cx("product-name")}
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
                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                    alt=""
                    shape="square"
                    size="large"
                  />
                </div>
                <div className={cx("product-right")}>
                  <div
                    className={"three-dot three-dot-1 " + cx("product-name")}
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
          </div>
        </Col>
        <Col xl={12} xs={24}>
          <div
            className={cx("paper")}
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
          </div>
        </Col>
        <Col xl={12} xs={24}>
          <div
            className={cx("paper")}
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
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default Dashboard;
