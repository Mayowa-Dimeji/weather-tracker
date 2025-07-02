import AirQuality from "./air-quality";
import AirQualityHistory from "./history";

const AirHistory = ({
  description = "Good",
  qualityIndex = 20,
  daily = [],
  hourly = [],
}: any) => {
  return (
    <section className="flex flex-col gap-4 p-6 w-full md:flex-row ">
      <AirQuality description={description} qualityIndex={qualityIndex} />
      <AirQualityHistory daily={daily} hourly={hourly} />
    </section>
  );
};

export default AirHistory;
