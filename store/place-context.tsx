import { createContext, useState } from "react";

import { Place } from "../models/place";

interface IPlaceState {
  places: Place[];
  addPlace: (place: Place) => void;
}

export const PlaceContext = createContext<IPlaceState>({
  places: [],
  addPlace: (place: Place) => {},
});

function PlaceProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);

  function addPlace(place: Place) {
    setPlaces((prev) => [place, ...prev]);
  }

  const value = { places, addPlace };

  return (
    <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
  );
}

export default PlaceProvider;
