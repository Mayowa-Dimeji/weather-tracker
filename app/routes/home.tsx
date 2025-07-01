import type { Route } from "./+types/home";
import MyNavBar from "~/pages/navbar/myNavBar";
import SearchBar from "~/pages/searchBar/search";
import CityDisplay from "~/pages/city-display/city-display";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Tracker App" },
    { name: "description", content: "Welcome to WeatherTracker" },
  ];
}

export default function Home() {
  return (
    <section>
      <MyNavBar />
      <SearchBar />
      <CityDisplay />
    </section>
  );
}
