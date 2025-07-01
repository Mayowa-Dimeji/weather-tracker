const CityBlock = () => {
  return (
    <section className="border border-gray-300 flex flex-col p-6">
      <section className="flex justify-between p-2">
        <section className="flex flex-col gap-2">
          <p className="font-bold"> New York, NY</p>
          <p>Today, time</p>
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
          src="https://img.icons8.com/?size=100&id=aWBc8fucFZnx&format=png&color=000000"
          alt="sunny"
        />
        <p>25°C</p>
        <p>sunny</p>
      </section>
      {/* visibility and humidity */}
      <section className="flex justify-between p-2">
        <section className="flex flex-col">
          <p>Visibility</p>
          <p className="font-bold">10 km</p>
        </section>
        <section className="flex flex-col">
          <p>Humidity</p>
          <p className="font-bold">60%</p>
        </section>
      </section>
      {/* wind and pressure */}
      <section className="flex justify-between p-2">
        <section className="flex flex-col">
          <p>Wind</p>
          <p className="font-bold">15 km/h</p>
        </section>
        <section className="flex flex-col">
          <p>Pressure</p>
          <p className="font-bold">1013 hPa</p>
        </section>
      </section>
    </section>
  );
};

export default CityBlock;
