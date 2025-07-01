import CityBlock from "./cityblock";
import CityMap from "./cityMap";
import { useLocation } from "react-router";
const CityDisplay = ({ weatherData }: any) => {
  const { state } = useLocation();
  return (
    <section className="city-display flex flex-col md:flex-row gap-4 p-8 justify-center">
      <CityBlock
        mycity={state?.city}
        description={weatherData?.current.weather.main}
        iconCode={weatherData?.current.weather.icon}
        temp={weatherData?.current.temp}
        visibility={weatherData?.current.visibility}
        humidity={weatherData?.current.humidity}
        wind={weatherData?.current.wind}
        pressure={weatherData?.current.pressure}
      />
      <CityMap lat={weatherData?.lat} lng={weatherData?.lng} zoom={8} />
    </section>
  );
};
export default CityDisplay;
