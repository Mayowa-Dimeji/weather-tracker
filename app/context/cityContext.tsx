// src/context/CityContext.tsx
import { createContext, useContext, useState } from "react";

export type City = {
  city: string;
  lat: number;
  lng: number;
  country: string;
  region: string;
};

type CityContextType = {
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: any }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
