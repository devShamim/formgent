import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
export default function SummaryPieChart( props ) {
	const { chartData } = props;
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={ 200 } height={ 200 }>
				<Pie
					dataKey="total"
					nameKey="label"
					data={ chartData }
					cx={ 300 }
					cy={ 100 }
					innerRadius={ 50 }
					outerRadius={ 100 }
					fill="#6551f2"
				/>
				<Tooltip />
				<Legend
					layout="vertical"
					align="right"
					verticalAlign="middle"
					height={ 36 }
					iconSize={ 8 }
					iconType="circle"
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}
