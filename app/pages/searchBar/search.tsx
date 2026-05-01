import { useState, useRef } from "react";
import type { City } from "~/context/cityContext";
import { useCity } from "~/context/cityContext";

// In-memory cache survives for the lifetime of the page session.
// Repeated searches for the same prefix never hit the network again.
const searchCache = new Map<string, any[]>();

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { setSelectedCity } = useCity();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const cacheKey = input.toLowerCase();
    const cached = searchCache.get(cacheKey);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    try {
      const res = await fetch(`/api/cities?q=${encodeURIComponent(input)}`);
      const json = await res.json();
      const cities: any[] = json.data ?? [];
      searchCache.set(cacheKey, cities);
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleInput = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
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
    setSelectedCity(selected);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <section className="flex items-center justify-center p-8 ">
      <section className="flex flex-col items-center relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleEnterKey}
          value={query}
          className="absolute border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 dark:text-gray-200 focus:bg-white focus:dark:bg-gray-500"
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
