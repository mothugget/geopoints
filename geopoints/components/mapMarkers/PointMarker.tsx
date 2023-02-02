import React from 'react';
import { AiFillEnvironment } from 'react-icons/ai';
import { Coordinates } from '../../types/types';
import { Marker } from '@react-google-maps/api';

const PointMarker = (coordinates: Coordinates) => {
  return (
    <Marker
      position={coordinates}
    />
  )
}

export default PointMarker;