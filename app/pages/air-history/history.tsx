import { useState } from "react";
import HourlyIconBar from "./hourly";
import SevenDayChart from "./daily";
const AirQualityHistory = ({ hourly, daily }: any) => {
  const [view, setView] = useState<"hourly" | "daily">("hourly");

  return (
    <section className="border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600/50 flex flex-col w-full md:w-2/3 rounded-lg shadow-md">
      {/* horly,7day and historical header */}
      <section className="flex gap-4  ">
        <p
          onClick={() => setView("hourly")}
          className={`cursor-pointer font-medium p-4 ${
            view === "hourly" ? "border-b-4 border-b-blue-500" : "border-none"
          }`}
        >
          Hourly
        </p>
        <p
          onClick={() => setView("daily")}
          className={`cursor-pointer p-4 font-medium ${
            view === "daily" ? "border-b-4 border-b-blue-500" : "border-none"
          }`}
        >
          7-Day
        </p>
      </section>
      {/* air quality history data */}
      {view === "hourly" && <HourlyIconBar hourly={hourly} />}
      {view === "daily" && <SevenDayChart daily={daily} />}
    </section>
  );
};

export default AirQualityHistory;
