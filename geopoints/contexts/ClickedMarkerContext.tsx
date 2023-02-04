import { createContext, useState, Dispatch, SetStateAction } from 'react';
import React from 'react';

interface ClickedMarkerContext {
  clickedPointId: number | null;
  setClickedPointId: Dispatch<SetStateAction<number | null>> | null;
}

const ClickedMarkerContext = createContext<ClickedMarkerContext>({
  clickedPointId: null,
  setClickedPointId: null,
});

function ClickedMarkerContextProvider({ children }: any) {
  const [clickedPointId, setClickedPointId] = useState<number | null>(null);

  return (
    <ClickedMarkerContext.Provider
      value={{
        clickedPointId,
        setClickedPointId,
      }}
    >
      {children}
    </ClickedMarkerContext.Provider>
  );
}

export { ClickedMarkerContext, ClickedMarkerContextProvider };
