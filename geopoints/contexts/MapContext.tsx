import { createContext, useState, Dispatch, SetStateAction } from 'react';

import { Point } from '../types/types'

interface MapContext {
  map: google.maps.Map | null;
  setMap: Dispatch<google.maps.Map | null> | null;
  showPointModal: boolean;
  setShowPointModal: Dispatch<SetStateAction<boolean>> | null;
  focusedPoint: Point | null;
  setFocusedPoint: Dispatch<SetStateAction<Point | null>> | null;
}

const MapContext = createContext<MapContext>({
  map: null,
  setMap: null,
  showPointModal: false,
  setShowPointModal: null,
  focusedPoint: null,
  setFocusedPoint: null
});

function MapContextProvider({ children }: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showPointModal, setShowPointModal] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<Point | null>(null)



  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        showPointModal,
        setShowPointModal,
        focusedPoint,
        setFocusedPoint
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
