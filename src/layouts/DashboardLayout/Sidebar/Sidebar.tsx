import {
  AppstoreAddOutlined,
  BarChartOutlined,
  FormOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import config from "../../../config";
import { DASHBOARD_LAYOUT } from "../../../constants";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

interface Item {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const items: Item[] = [
  {
    text: "Bảng điều khiển",
    path: config.routes.dashboard,
    icon: <AppstoreAddOutlined />,
  },
  {
    text: "Bảng",
    path: config.routes.table,
    icon: <TableOutlined />,
  },
  {
    text: "Form",
    path: config.routes.form,
    icon: <FormOutlined />,
  },
  {
    text: "Thống kê, báo cáo",
    path: config.routes.report,
    icon: <BarChartOutlined />,
  },
];

interface Props {
  width: number | string;
  isFull: boolean | undefined;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const { width, isFull } = props;
  const location = useLocation();
  return (
    <section
      className={cx("box")}
      style={{ width, top: DASHBOARD_LAYOUT.HEADER_HEIGHT }}
    >
      <ul className={cx("menu")}>
        {items.map((item: Item, index: number) => {
          return (
            <li className={cx("menu-item")} key={index}>
              <Link
                to={item.path}
                className={`${cx("menu-item-link")} ${
                  location.pathname === item.path ? cx("active") : ""
                }`}
              >
                {isFull ? (
                  <>
                    <span className={cx("menu-item-link-icon")}>
                      {item.icon}
                    </span>
                    <span className={cx("menu-item-link-text")}>
                      {item.text}
                    </span>
                  </>
                ) : (
                  <Tooltip placement="right" title={item.text}>
                    <span className={cx("menu-item-link-icon")}>
                      {item.icon}
                    </span>
                  </Tooltip>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
