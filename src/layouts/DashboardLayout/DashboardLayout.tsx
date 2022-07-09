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
  const [isFull, setIsFull] = React.useState(screens.xl);

  return (
    <div className={cx("main")}>
      <Header onClick={() => setIsFull(!isFull)} />
      <div
        className={cx("wrapper")}
        style={{
          top: DASHBOARD_LAYOUT.HEADER_HEIGHT,
          height: `calc(100vh - ${DASHBOARD_LAYOUT.HEADER_HEIGHT}px)`,
        }}
      >
        <Sidebar
          width={isFull && screens.xl ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52}
          isFull={isFull && screens.xl}
        />

        <div
          className={`${cx("body")} custom-scrollbar`}
          style={{
            left: isFull && screens.xl ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52,
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
