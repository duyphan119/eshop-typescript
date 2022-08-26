import React from "react";
import classNames from "classnames/bind";
import styles from "./DashboardLayout.module.scss";
import { Grid } from "antd";
import { DASHBOARD_LAYOUT } from "constant";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { decodeToken } from "utils";
import { UserRole } from "interfaces/userRoles";
import { Navigate } from "react-router-dom";
import config from "config";
const cx: Function = classNames.bind(styles);
interface Props {
	children: React.ReactElement;
}

const { useBreakpoint } = Grid;
const DashboardLayout: React.FC<Props> = (props: Props) => {
	const { children } = props;
	const screens = useBreakpoint();
	const [isFull, setIsFull] = React.useState(true);

	if (!decodeToken(localStorage.getItem("AT"))?.roles.find((item: UserRole) => item.role && item.role.name === "ADMIN")) {
		return <Navigate to={config.routes.notFound} />;
	}

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
				<Sidebar width={screens.xl && isFull ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52} isFull={screens.xl && isFull} />

				<div
					className={`${cx("body")} custom-scrollbar`}
					style={{
						left: screens.xl && isFull ? DASHBOARD_LAYOUT.SIDEBAR_WIDTH : 52,
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
