const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface CityMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

const CityMap = ({ lat, lng, zoom = 10 }: CityMapProps) => {
  const hasCoords = lat != null && lng != null;

  const src = hasCoords
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},${zoom}/600x400@2x?access_token=${MAPBOX_TOKEN}`
    : null;

  return (
    <section className="border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600/50 flex flex-col rounded-lg w-full md:w-2/3 object-contain p-2">
      <section className="map-header items-center flex p-2 text-center md:text-left">
        <h2 className="font-bold">City Map</h2>
      </section>

      {src ? (
        <img
          src={src}
          alt="City map"
          loading="lazy"
          className="w-full h-64 md:h-96 rounded-md shadow-md object-cover"
        />
      ) : (
        <div className="w-full h-64 md:h-96 rounded-md flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
          Search for a city to see the map
        </div>
      )}
    </section>
  );
};

export default CityMap;
