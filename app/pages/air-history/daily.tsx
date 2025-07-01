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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);
const SevenDayChart = ({ daily = [1, 2, 3, 4, 5, 6, 7] }: any) => {
  const [dayChart, setDayChart] = useState({});
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  useEffect(() => {
    if (daily) {
      setDayChart(buildDailyChart(daily));
    }
  }, [daily]);

  return (
    <section className="p-4 bg-white rounded-lg shadow space-y-4">
      <div className="flex gap-4 mb-2">
        <p
          onClick={() => setChartType("line")}
          className={`cursor-pointer px-3 py-1 rounded-md text-sm font-medium ${
            chartType === "line"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Line
        </p>
        <p
          onClick={() => setChartType("bar")}
          className={`cursor-pointer px-3 py-1 rounded-md text-sm font-medium ${
            chartType === "bar"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Bar
        </p>
      </div>

      <h2 className="text-lg font-semibold">7-Day Forecast</h2>

      {chartType === "line" ? (
        <Line data={dayChart as any} options={{ responsive: true }} />
      ) : (
        <Bar data={dayChart as any} options={{ responsive: true }} />
      )}
    </section>
  );
};

// helper
function buildDailyChart(daily: any[]) {
  return {
    labels: daily.map((d) =>
      new Date(d.dt * 1000).toLocaleDateString("en-GB", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Max Temp (°C)",
        data: daily.map((d) => d.temp.max),
        backgroundColor: "rgba(16, 185, 129, 0.5)", // Tailwind green-500
        borderColor: "rgba(16, 185, 129, 1)",
        tension: 0.4,
      },
      {
        label: "Min Temp (°C)",
        data: daily.map((d) => d.temp.min),
        backgroundColor: "rgba(239, 68, 68, 0.5)", // Tailwind red-500
        borderColor: "rgba(239, 68, 68, 1)",
        tension: 0.4,
      },
    ],
  };
}

export default SevenDayChart;
