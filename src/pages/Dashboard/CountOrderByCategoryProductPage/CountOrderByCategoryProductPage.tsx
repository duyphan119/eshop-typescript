import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from "chart.js";
import { DASHBOARD_LAYOUT } from "constant";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);
interface Props {
	labels: string[];
	data: number[];
	pieColors?: string[];
	label: string;
}
const CountOrderByCategoryProductPage: React.FC<Props> = (props: Props) => {
	const { labels, data, pieColors, label } = props;
	return (
		<div>
			<Pie
				height={DASHBOARD_LAYOUT.CHART_MIDDLE_HEIGHT}
				data={{
					labels,
					datasets: [
						{
							label,
							data,
							backgroundColor: pieColors || ["var(--primary-color)", "#1f92af", "#01faff"],
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

export default React.memo(CountOrderByCategoryProductPage);
