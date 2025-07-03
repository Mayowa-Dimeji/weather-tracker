import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
// Example data import, replace with actual data source

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

interface HourlyIconBarProps {
  hourly: any[];
}

const HourlyIconBar = ({ hourly = [] }: HourlyIconBarProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  useEffect(() => {
    if (!hourly || hourly.length === 0) return;

    const labels = hourly
      .slice(0, 12)
      .map((hour: any) =>
        new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit" })
      );

    const temps = hourly.slice(0, 12).map((hour: any) => hour.temp);

    setChartData({
      labels,
      datasets: [
        {
          label: "Temp (°C)",
          data: temps,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [hourly]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // 🛑 remove tooltip
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => `${value}°C`,
        },
      },
    },
  };

  return (
    <section className="p-4  rounded-lg  shadow space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Hourly Forecast</h2>
        <div className="flex justify-end gap-4 mb-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 text-sm rounded ${
              chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded ${
              chartType === "bar" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Bar
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-white via-gray-50 to-white rounded-lg p-4">
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

      <div className="flex justify-between items-center mt-4 px-2">
        {hourly.slice(0, 12).map((hour: any) => (
          <div key={hour.dt} className="flex flex-col items-center text-xs">
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt=""
              className="w-8 h-8"
            />
            <span>{new Date(hour.dt * 1000).getHours()}h</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyIconBar;
