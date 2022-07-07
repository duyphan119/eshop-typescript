import React from "react";
import classNames from "classnames/bind";
import styles from "./DashboardLayout.module.scss";
import Sidebar from "./Sidebar";
import { Grid } from "antd";
import { DASHBOARD_LAYOUT } from "../../constants";
import Header from "./Header";
const cx = classNames.bind(styles);
interface Props {
  children: React.ReactElement;
}

const { useBreakpoint } = Grid;
const DashboardLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const screens = useBreakpoint();

  return (
    <div className={cx("main")}>
      <Header />
      <div
        className={cx("wrapper")}
        style={{
          top: DASHBOARD_LAYOUT.HEADER_HEIGHT,
          height: `calc(100vh - ${DASHBOARD_LAYOUT.HEADER_HEIGHT}px)`,
        }}
      >
        <Sidebar
          width={screens.lg ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52}
          isFull={screens.lg}
        />

        <div
          className={`${cx("body")} custom-scrollbar`}
          style={{
            left: screens.lg ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52,
            top: DASHBOARD_LAYOUT.HEADER_HEIGHT,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
