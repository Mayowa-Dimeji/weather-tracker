import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface HourlyIconBarProps {
  hourly: any[];
}

const HourlyIconBar = ({ hourly = [] }: HourlyIconBarProps) => {
  const [chartData, setChartData] = useState<any>(null);

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
          label: "Temperature (°C)",
          data: temps,
          borderColor: "#3b82f6", // Tailwind blue-500
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [hourly]);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const hour = hourly[index];
            return [
              `Temp: ${hour.temp}°C`,
              `Weather: ${hour.weather[0]?.description}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            return `${tickValue}°C`;
          },
        },
      },
    },
  };

  return (
    <section className="p-4 w-full rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-bold text-center mb-2">Hourly Forecast</h2>

      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}

      <div className="flex justify-between items-center mt-4 px-2">
        {hourly.slice(0, 12).map((hour: any) => (
          <div key={hour.dt} className="flex flex-col items-center text-xs">
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              title={hour.weather[0].description}
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
