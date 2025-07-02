import { useState } from "react";
import { useNavigate } from "react-router"; // ✅ useRouter should use 'react-router-dom'
import type { City } from "~/context/cityContext";
import { useCity } from "~/context/cityContext"; // ✅ correct import
import axios from "axios";

const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";
const GEO_API_KEY = import.meta.env.VITE_GEODB_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // ✅ better typing
  const { selectedCity, setSelectedCity } = useCity(); // ✅ use context
  const navigate = useNavigate();

  const fetchSuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`https://${GEO_API_HOST}/v1/geo/cities`, {
        params: {
          namePrefix: input,
          limit: 5,
          sort: "-population",
        },
        headers: {
          "X-RapidAPI-Key": GEO_API_KEY,
          "X-RapidAPI-Host": GEO_API_HOST,
        },
      });
      setSuggestions(res.data.data);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSelect = (cityObj: any) => {
    const selected: City = {
      city: cityObj.city,
      lat: cityObj.latitude,
      lng: cityObj.longitude,
      country: cityObj.countryCode,
      region: cityObj.regionCode,
    };

    setQuery(`${selected.city}, ${selected.country}`);
    setSuggestions([]);
    setSelectedCity(selected); // ✅ update context

    // ✅ Optional: navigate to location if you're using route-based rendering
    // navigate(`/location/${selected.city}`);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex items-center justify-center p-8 ">
      <section className="flex flex-col items-center relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleEnterKey}
          value={query}
          className="absolute border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full top-full mt-11 bg-gray-50 dark:bg-gray-700/95 border border-gray-200 rounded-sm shadow-md z-10">
            {suggestions.map((city: any) => (
              <li
                key={city.id}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500"
              >
                {city.city}, {city.regionCode} ({city.countryCode})
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default SearchBar;
