import CityBlock from "./cityblock";
import CityMap from "./cityMap";
const CityDisplay = () => {
  return (
    <section className="city-display flex flex-col md:flex-row gap-4 p-8 justify-center">
      <CityBlock />
      <CityMap lat={51.5074} lng={-0.1276} zoom={8} />
    </section>
  );
};
export default CityDisplay;
