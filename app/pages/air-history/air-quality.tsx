import ProgressBar from "./progressBar";
const AirQuality = ({ description = "Good", qualityIndex = 20 }: any) => {
  return (
    <section className="border border-gray-300 dark:border-gray-500 flex flex-col w-full md:w-1/3  rounded-lg shadow-md">
      <section className="header-quality shadow-sm flex justify-between p-4">
        <h2 className="font-bold">Air Quality</h2>
      </section>
      <section className="air-quality-body p-4 flex flex-col gap-4">
        <section className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 48 48"
            className="size-10 border-0"
            fill="green"
          >
            <path
              stroke="#000"
              stroke-width="1"
              d="M24 33C28.9706 33 33 28.9706 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33Z"
            />
          </svg>
          <p>
            {description}, {qualityIndex}
          </p>
        </section>

        <ProgressBar value={qualityIndex} />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Air Quality is satisfactory for most people
        </p>
      </section>
    </section>
  );
};

export default AirQuality;
