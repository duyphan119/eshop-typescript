import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from "chart.js";
import { DASHBOARD_LAYOUT } from "constant";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);
interface Props {
	labels: string[];
	data: number[];
	barColor?: string;
	label: string;
}
const ChartRevenueToday: React.FC<Props> = (props: Props) => {
	const { labels, data, barColor, label } = props;
	return (
		<div>
			<Bar
				height={DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT}
				data={{
					labels,
					datasets: [
						{
							label,
							data,
							backgroundColor: barColor || "var(--primary-color)",
						},
					],
				}}
				options={{
					maintainAspectRatio: false,
					scales: {},
				}}
			/>
		</div>
	);
};

export default React.memo(ChartRevenueToday);
