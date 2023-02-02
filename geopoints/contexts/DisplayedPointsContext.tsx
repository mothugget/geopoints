import { createContext, useState, Dispatch } from 'react';
import { Point } from '../types/types';
import React from 'react';

interface DisplayedPointsContext {
  displayedPoints: Point[] | null;
  setDisplayedPoints: Dispatch <Point[] | null> | null;
}

const DisplayedPointsContext = createContext<DisplayedPointsContext>({
  displayedPoints: null,
  setDisplayedPoints: null,
});

function DisplayedPointsContextProvider({ children }: any) {
  const [displayedPoints, setDisplayedPoints] = useState<Point[] | null>(null);

  return (
    <DisplayedPointsContext.Provider
      value={{
        displayedPoints,
        setDisplayedPoints,
      }}
    >
      {children}
    </DisplayedPointsContext.Provider>
  );
}

export { DisplayedPointsContext, DisplayedPointsContextProvider };
