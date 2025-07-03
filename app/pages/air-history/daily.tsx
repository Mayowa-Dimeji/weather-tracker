import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
// Example data import, replace with actual data source

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
}

interface SevenDayChartProps {
  daily: DailyForecast[];
}

const SevenDayChart = ({ daily = [] }: SevenDayChartProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  useEffect(() => {
    if (daily.length > 0) {
      const labels = daily.map((d) =>
        new Date(d.dt * 1000).toLocaleDateString("en-GB", { weekday: "short" })
      );

      const maxTemps = daily.map((d) => d.temp.max);
      const minTemps = daily.map((d) => d.temp.min);

      setChartData({
        labels,
        datasets: [
          {
            label: "Max Temp (°C)",
            data: maxTemps,
            backgroundColor: "rgba(16, 185, 129, 0.5)",
            borderColor: "rgba(16, 185, 129, 1)",
            fill: chartType === "line",
            tension: 0.4,
          },
          {
            label: "Min Temp (°C)",
            data: minTemps,
            backgroundColor: "rgba(239, 68, 68, 0.5)",
            borderColor: "rgba(239, 68, 68, 1)",
            fill: chartType === "line",
            tension: 0.4,
          },
        ],
      });
    }
  }, [daily, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => `${value}°C`,
        },
      },
    },
  };

  return (
    <section className="p-4  rounded-lg shadow space-y-4">
      <section className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-center">7-Day Forecast</h2>
        <div className="flex justify-end gap-4 mb-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              chartType === "line"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              chartType === "bar"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Bar
          </button>
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-gray-500 rounded-lg p-4">
        {chartData ? (
          chartType === "line" ? (
            <Line data={chartData} options={options} />
          ) : (
            <Bar data={chartData} options={options} />
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default SevenDayChart;
