import type { Route } from "./+types/api.cities";

const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  if (q.length < 2) {
    return Response.json({ data: [] });
  }

  const key = process.env.GEODB_API_KEY;
  if (!key) {
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const upstream = await fetch(
    `https://${GEO_API_HOST}/v1/geo/cities?namePrefix=${encodeURIComponent(q)}&limit=5&sort=-population`,
    {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": GEO_API_HOST,
      },
    }
  );

  if (!upstream.ok) {
    return Response.json({ data: [] });
  }

  const data = await upstream.json();

  // Cities don't change — cache aggressively at the CDN edge.
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
