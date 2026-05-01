import { useState, lazy, Suspense } from "react";
import myDaily from "./dummydaily.json";
import myHourly from "./dummyhourly.json";

const HourlyIconBar = lazy(() => import("./hourly"));
const SevenDayChart = lazy(() => import("./daily"));

const ChartSkeleton = () => (
  <div className="p-4 space-y-4">
    <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-600 animate-pulse" />
    <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse" />
  </div>
);

const AirQualityHistory = ({ hourly = myHourly, daily = myDaily }: any) => {
  const [view, setView] = useState<"hourly" | "daily">("hourly");

  return (
    <section className="border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600/50 flex flex-col w-full md:w-2/3 rounded-lg shadow-md">
      <section className="flex gap-4">
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

      <Suspense fallback={<ChartSkeleton />}>
        {view === "hourly" && <HourlyIconBar hourly={hourly} />}
        {view === "daily" && <SevenDayChart daily={daily} />}
      </Suspense>
    </section>
  );
};

export default AirQualityHistory;
