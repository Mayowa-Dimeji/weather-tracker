const CityBlock = ({
  city = "London",
  country = "United Kingdom",
  description = "sunny",
  iconCode = "10d",
  temp = 25,
  visibility = 10,
  humidity = 60,
  wind = 15,
  pressure = 1013,

  regionCode = "UK",
}: any) => {
  return (
    <section className="border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-600/50 flex flex-col p-6 w-full md:w-1/3 rounded-lg shadow-md ">
      <section className="flex justify-between p-2">
        <section className="flex flex-col gap-2">
          <p className="font-bold">
            {city}, {country}
          </p>
          {/* time instead */}
          <p>Today, {new Date().toLocaleDateString()}</p>
        </section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 16 16"
          className="size-4"
        >
          <path
            fill="currentColor"
            d="M12 2S9 2 8 5C7 2 4 2 4 2C1.8 2 0 3.8 0 6c0 4.1 8 9 8 9s8-5 8-9c0-2.2-1.8-4-4-4z"
          />
        </svg>
      </section>

      {/* weather info */}
      <section className="flex flex-col justify-center items-center gap-2">
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="sunny"
        />
        <p>{temp}°C</p>
        <p>{description}</p>
      </section>
      {/* visibility and humidity */}
      <section className="flex justify-between p-2">
        <section className="flex flex-col">
          <p>Visibility</p>
          <p className="font-bold">{visibility} km</p>
        </section>
        <section className="flex flex-col">
          <p>Humidity</p>
          <p className="font-bold">{humidity}%</p>
        </section>
      </section>
      {/* wind and pressure */}
      <section className="flex justify-between p-2">
        <section className="flex flex-col">
          <p>Wind</p>
          <p className="font-bold">{wind} km/h</p>
        </section>
        <section className="flex flex-col">
          <p>Pressure</p>
          <p className="font-bold">{pressure} hPa</p>
        </section>
      </section>
    </section>
  );
};

export default CityBlock;
