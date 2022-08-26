import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
import { Space, Spin } from "antd";
const cx: Function = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx("loading")}>
      <Space>
        <Spin /> Đang tải...
      </Space>
    </div>
  );
};

export default Loading;
