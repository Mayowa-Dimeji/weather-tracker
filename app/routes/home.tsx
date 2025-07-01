import type { Route } from "./+types/home";
import MyNavBar from "~/pages/navbar/myNavBar";
import SearchBar from "~/pages/searchBar/search";

import AirHistory from "~/pages/air-history/air-history";
import { useEffect, useState } from "react";
import CityBlock from "~/pages/city-display/cityblock";
import CityMap from "~/pages/city-display/cityMap";

import { useCity } from "~/context/cityContext";

import axios from "axios";

const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Tracker App" },
    { name: "description", content: "Welcome to WeatherTracker" },
  ];
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const { selectedCity } = useCity();

  // fetch weather data when selectedCity changes
  useEffect(() => {
    if (!selectedCity?.lat || !selectedCity?.lng) return;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat: selectedCity.lat,
              lon: selectedCity.lng,
              units: "metric",
              exclude: "minutely,alerts",
              appid: WEATHER_KEY,
            },
          }
        );

        setWeatherData(res.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <section className="pb-1  ">
      <MyNavBar />
      <SearchBar />
      <section className="city-display flex flex-col md:flex-row gap-4 p-8 justify-center">
        <CityBlock
          city={selectedCity?.city}
          country={selectedCity?.country}
          regionCode={selectedCity?.region}
          description={weatherData?.current?.weather[0]?.description}
          iconCode={weatherData?.current?.weather[0]?.icon}
          temp={weatherData?.current?.temp}
          visibility={weatherData?.current?.visibility}
          humidity={weatherData?.current?.humidity}
          wind={weatherData?.current?.wind_speed}
          pressure={weatherData?.current?.pressure}
        />
        <CityMap />
      </section>
      <AirHistory />
    </section>
  );
}
