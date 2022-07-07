import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { DASHBOARD_LAYOUT } from "../../../constants";
import {
  BellOutlined,
  DownOutlined,
  MenuOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import config from "../../../config";
import { Avatar, Badge, Dropdown, Input, Menu } from "antd";

const cx = classNames.bind(styles);
const menu = (
  <Menu
    items={[
      {
        label: <Link to="/">Thông tin tài khoản</Link>,
        key: "0",
      },
      {
        label: <Link to="/">Đổi mật khẩu</Link>,
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: "Đăng xuất",
        key: "3",
      },
    ]}
  />
);
const Header: React.FC = () => {
  return (
    <section
      className={cx("box")}
      style={{ height: DASHBOARD_LAYOUT.HEADER_HEIGHT }}
    >
      <div
        className={cx("logo-wrapper")}
        style={{ width: DASHBOARD_LAYOUT.SIDEBAR_WIDTH }}
      >
        <Link to={config.routes.home} className={cx("logo-link")}>
          DUYP
        </Link>
        <span className={cx("menu-icon")}>
          <MenuOutlined />
        </span>
      </div>
      <div className={cx("right")}>
        <div className={cx("search-wrapper")}>
          <Input placeholder="Tìm ở đây" prefix={<SearchOutlined />} />
        </div>
        <div className={cx("icons")}>
          <div className={cx("icon")}>
            <Badge count={5} size="small">
              <BellOutlined />
            </Badge>
          </div>
          <div className={cx("icon")}>
            <Badge count={5} size="small">
              <MessageOutlined />
            </Badge>
          </div>
        </div>
        <div className={cx("account-action")}>
          {1 < 2 ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a href="/#" onClick={(e) => e.preventDefault()}>
                <Avatar
                  shape="square"
                  src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/290326324_10217497507629171_7041127783904452504_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lYt4O-VMMOYAX-GuYzQ&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_1sC6AbyoqbYx9NkBem16bAbvRYiOoztMWvrt9a_0jcA&oe=62CBDCA9"
                  alt=""
                />
                <span className={cx("account-fullName")}>Duy Phan</span>
                <DownOutlined />
              </a>
            </Dropdown>
          ) : (
            <Link to="/" className={cx("account-link")}>
              Đăng nhập / Đăng ký
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
