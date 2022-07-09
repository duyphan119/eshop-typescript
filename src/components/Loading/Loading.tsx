import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
import { Space, Spin } from "antd";
const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx("loading")}>
      <Space>
        <Spin /> loading...
      </Space>
    </div>
  );
};

export default Loading;
