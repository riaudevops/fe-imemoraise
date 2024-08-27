import { BarChartProps } from "../../interfaces/common.interfaces";

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartHeight = 450;
  const barWidth = 80;
  const maxTotal = Math.max(...data.map((d) => d.y));

  return (
    <svg
      className="flex justify-end w-full h-full pt-5 px-2 mb-2 border border-neutral-content"
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
              className="fill-primary hover:fill-primary/70"
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
            <text
              x={i * (barWidth + 5) + barWidth / 2}
              y={chartHeight - barHeight + 54}
              textAnchor="middle"
              className="font-bold fill-base-100 text-xs underline italic"
              fontSize="15"
            >
              {d.x.split("T")[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChart;
