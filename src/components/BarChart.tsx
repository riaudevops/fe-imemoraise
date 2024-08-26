interface DataProps {
	x: string;
	y: number;
}

interface BarChartProps {
	data: DataProps[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
	const chartHeight = 400;
	const barWidth = 64;

	const maxTotal = Math.max(...data.map((d) => d.y));

	return (
		<svg
			className="w-full h-full flex justify-end pt-5 border border-neutral-content"
			height={chartHeight}
		>
			{data.map((d, i) => {
				const barHeight = (d.y / maxTotal) * chartHeight;
				return (
					<g key={d.x}>
						<rect
							x={i * (barWidth + 5)}
							y={chartHeight - barHeight}
							width={barWidth}
							height={barHeight}
							className="fill-primary"
						/>
						<text
							x={i * (barWidth + 5) + barWidth / 2}
							y={chartHeight - barHeight + 35}
							textAnchor="middle"
							className="fill-base-100 font-bold"
							fontSize="15"
						>
							{d.y}x acc
						</text>
					</g>
				);
			})}
		</svg>
	);
};

export default BarChart;
