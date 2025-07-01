import AirQuality from "./air-quality";
import AirQualityHistory from "./history";

const AirHistory = () => {
  return (
    <section className="flex flex-col gap-4 p-6 w-full md:flex-row ">
      <AirQuality />
      <AirQualityHistory />
    </section>
  );
};

export default AirHistory;
