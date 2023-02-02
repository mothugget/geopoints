import React from 'react';
import { AiFillEnvironment } from 'react-icons/ai';
import { Coordinates } from '../../types/types';
import { Marker } from '@react-google-maps/api';

const PointMarker = (coordinates: Coordinates) => {
  const customIcon = {
    position: coordinates,
    icon: {
      path: '../../public/geopoints-logo.svg'
    }
  }

  return (
    <Marker
      position={coordinates}
    />
  )
}

export default PointMarker;