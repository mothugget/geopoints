import { createContext, useState, Dispatch, SetStateAction } from 'react';
import React from 'react';
import { Coordinates } from '../types/types';

interface RoutesContext {
  destinationService: DestinationService;
  setDestinationService: Dispatch<SetStateAction<DestinationService>> | null;
}

const RoutesContext = createContext<RoutesContext>({
  destinationService: { showRoute: false, destination: { lat: 0, lng: 0 } },
  setDestinationService: null,
});

interface DestinationService {
  showRoute: boolean;
  destination: Coordinates;
}
function RoutesContextProvider({ children }: any) {
  const [destinationService, setDestinationService] = useState({
    showRoute: false,
    destination: { lat: 0, lng: 0 },
  });

  return (
    <RoutesContext.Provider
      value={{
        destinationService,
        setDestinationService,
      }}
    >
      {children}
    </RoutesContext.Provider>
  );
}

export { RoutesContext, RoutesContextProvider };
