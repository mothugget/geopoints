import { createContext, useState, Dispatch, SetStateAction } from 'react';

import { Point } from '../types/types'

interface MapContext {
  map: google.maps.Map | null;
  setMap: Dispatch<google.maps.Map | null> | null;
  showCrosshair: boolean;
  setShowCrosshair: Dispatch<SetStateAction<boolean>> | null;
}

const MapContext = createContext<MapContext>({
  map: null,
  setMap: null,
  showCrosshair: false,
  setShowCrosshair: null,
});

function MapContextProvider({ children }: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showCrosshair, setShowCrosshair] = useState(false);



  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        showCrosshair,
        setShowCrosshair,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
