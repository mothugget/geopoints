import { createContext, useState, Dispatch } from 'react';
import { Point } from '../types/types';
import React from 'react';

interface DisplayedPointsContext {
  displayedPoints: Point[];
  setDisplayedPoints: Dispatch <Point[] | null> | null ;
}

const DisplayedPointsContext = createContext<DisplayedPointsContext>({
  displayedPoints: [],
  setDisplayedPoints: null,
});

function DisplayedPointsContextProvider({ children }: any) {
  const [displayedPoints, setDisplayedPoints] = useState<Point[]>([]);

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
