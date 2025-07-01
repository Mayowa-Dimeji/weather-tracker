import type { Route } from "./+types/home";
import MyNavBar from "~/pages/navbar/myNavBar";
import SearchBar from "~/pages/searchBar/search";
import CityDisplay from "~/pages/city-display/city-display";
import AirHistory from "~/pages/air-history/air-history";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Tracker App" },
    { name: "description", content: "Welcome to WeatherTracker" },
  ];
}

export default function Home() {
  const { state } = useLocation();
  const [weatherData, setWeatherData] = useState<any>(null);

  // fetch open from openweather API
  useEffect(() => {
    if (!state?.lat || !state?.lng) return;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat: state.lat,
              lon: state.lng,
              units: "metric",
              exclude: "minutely,alerts",
              appid: WEATHER_KEY,
            },
          }
        );

        setWeatherData(res.data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    fetchWeather();
  }, [state]);
  return (
    <section className="pb-1  ">
      <MyNavBar />
      <SearchBar />
      <CityDisplay />
      <AirHistory />
    </section>
  );
}
