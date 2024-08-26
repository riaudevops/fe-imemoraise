import { BarChartProps } from "../../interfaces/common.interfaces";

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartHeight = 400;
  const barWidth = 64;
  const maxTotal = Math.max(...data.map((d) => d.y));

  return (
    <svg
      className="flex justify-end w-full h-full pt-5 border border-neutral-content"
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
              className="font-bold fill-base-100"
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
