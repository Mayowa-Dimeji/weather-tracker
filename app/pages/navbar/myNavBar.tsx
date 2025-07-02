const MyNavBar = () => {
  return (
    <section className="flex justify-between items-center p-8 shadow-sm bg-gray-50 dark:bg-gray-600/50">
      <section className="flex items-center gap-2">
        <img
          src="https://img.icons8.com/?size=100&id=1AfLv3KbfVba&format=png&color=000000"
          alt="weatherLogo"
          className="size-10"
        />
        <p className="text-xl font-bold">WeatherTracker</p>
      </section>
      <section className="flex items-center gap-4">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 16 16"
            className="size-4"
          >
            <path fill="currentColor" d="M3 0v16l5-5l5 5V0z" />
          </svg>
        </a>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 1472 1536"
            className="size-4"
          >
            <path
              fill="currentColor"
              d="M1464 1090q-94 203-283 323.5T768 1536q-157-1-299-62t-244.5-163.5T61 1066T0 768q0-205 97.5-378t267-276.5T738 2q43-2 62 38q17 42-16 72q-176 164-176 400q0 111 43 211.5t115 173t172.5 116T1151 1056q119 0 228-51q41-18 72 13t13 72z"
            />
          </svg>
        </button>
      </section>
    </section>
  );
};
export default MyNavBar;
