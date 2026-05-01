import type { Route } from "./+types/api.weather";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return Response.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  const key = process.env.OPENWEATHER_KEY;
  if (!key) {
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const upstream = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${key}`
  );

  if (!upstream.ok) {
    return Response.json(
      { error: "Weather API error" },
      { status: upstream.status }
    );
  }

  const data = await upstream.json();

  // s-maxage: Vercel Edge CDN caches this response for 10 min per lat/lon.
  // stale-while-revalidate: serve stale for 5 more min while revalidating in background.
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
    },
  });
}
