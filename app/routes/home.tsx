import type { Route } from "./+types/home";
import MyNavBar from "~/pages/navbar/myNavBar";
import SearchBar from "~/pages/searchBar/search";
import AirHistory from "~/pages/air-history/air-history";
import { useEffect, useState } from "react";
import CityBlock from "~/pages/city-display/cityblock";
import CityMap from "~/pages/city-display/cityMap";
import { useCity } from "~/context/cityContext";

const WEATHER_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCachedWeather(lat: number, lng: number) {
  try {
    const key = `wx_${lat.toFixed(4)}_${lng.toFixed(4)}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > WEATHER_CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCachedWeather(lat: number, lng: number, data: unknown) {
  try {
    const key = `wx_${lat.toFixed(4)}_${lng.toFixed(4)}`;
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage unavailable (private browsing quota, etc.)
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Tracker App" },
    { name: "description", content: "Welcome to WeatherTracker" },
  ];
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    if (!selectedCity?.lat || !selectedCity?.lng) return;

    const cached = getCachedWeather(selectedCity.lat, selectedCity.lng);
    if (cached) {
      setWeatherData(cached);
      return;
    }

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lng}`
        );

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        setWeatherData(data);
        setCachedWeather(selectedCity.lat, selectedCity.lng, data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
  }, [selectedCity]); // weatherData intentionally omitted — including it causes infinite refetch

  return (
    <section className="pb-1">
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
        <CityMap lat={selectedCity?.lat} lng={selectedCity?.lng} />
      </section>
      <AirHistory
        description={weatherData?.current?.weather[0]?.description}
        qualityIndex={weatherData?.current?.air_quality?.index}
        daily={weatherData?.daily}
        hourly={weatherData?.hourly}
      />
    </section>
  );
}
