import { Space } from "antd";
import React from "react";
interface Props {
	cx: Function;
	icon: React.ReactElement;
	name: string;
	value: string | number;
	compare: string;
	rate: "inc" | "desc";
}
const Widget: React.FC<Props> = (props: Props) => {
	const { cx, icon, name, value, compare, rate } = props;
	return (
		<div className={cx("widget")}>
			<Space direction="vertical">
				<span className={cx("widget-title")}>{name}</span>
				<span className={cx("widget-value")}>{value}</span>
				<span className={`${cx("widget-compare")} ${cx(rate)}`}>
					{compare}
				</span>
			</Space>
			<span className={cx("widget-icon")}>{icon}</span>
		</div>
	);
};

export default React.memo(Widget);
