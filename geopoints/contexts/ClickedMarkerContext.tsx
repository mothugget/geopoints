import { createContext, useState, Dispatch, SetStateAction } from 'react';
import React from 'react';
import { Point } from '../types/types';

interface ClickedMarkerContext {
  clickedPoint: Point | null;
  setClickedPoint: Dispatch<SetStateAction<Point | null>> | null;
}

const ClickedMarkerContext = createContext<ClickedMarkerContext>({
  clickedPoint: null,
  setClickedPoint: null,
});

function ClickedMarkerContextProvider({ children }: any) {
  const [clickedPoint, setClickedPoint] = useState<Point | null>(null);

  return (
    <ClickedMarkerContext.Provider
      value={{
        clickedPoint,
        setClickedPoint,
      }}
    >
      {children}
    </ClickedMarkerContext.Provider>
  );
}

export { ClickedMarkerContext, ClickedMarkerContextProvider };
