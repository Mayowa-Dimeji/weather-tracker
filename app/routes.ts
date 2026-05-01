import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/api/weather", "routes/api.weather.tsx"),
  route("/api/cities", "routes/api.cities.tsx"),
] satisfies RouteConfig;
