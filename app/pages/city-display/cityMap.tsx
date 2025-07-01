import { useRef, useEffect, use } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
console.log("Mapbox token:", import.meta.env.VITE_MAPBOX_TOKEN);

const CityMap = ({ lat = 51.5074, lng = -0.1276, zoom = 8 }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    return () => {
      map.remove();
    };
  }, [lat, lng, zoom]);

  return (
    <section className="border border-gray-300 dark:border-gray-500 flex flex-col rounded-lg w-full md:w-2/3 object-contain p-2">
      <section className="map-header items-center flex p-2 text-center md:text-left">
        <h2 className="font-bold">City Map</h2>
      </section>

      <section
        ref={mapContainer}
        className="map-container w-full h-64 md:h-96 rounded-md shadow-md object-contain"
      ></section>
    </section>
  );
};

export default CityMap;
