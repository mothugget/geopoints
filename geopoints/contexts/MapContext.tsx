import { createContext, useState, Dispatch } from 'react';

interface MapContext {
  map: google.maps.Map | null;
  setMap: Dispatch<google.maps.Map | null> | null;
}

const MapContext = createContext<MapContext>({
  map: null,
  setMap: null,
});

function MapContextProvider({ children }: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
