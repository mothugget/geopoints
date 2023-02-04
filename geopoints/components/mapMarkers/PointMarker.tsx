import React from 'react';
import { useRouter } from 'next/router'
import { Marker } from '@react-google-maps/api';

import { Point } from '../../types/types';
import logo from '../../public/geopoints-logo-contrasted.png'
import { MapContext } from '../../contexts/MapContext';

interface PointMarkerProps {
  point: Point
}

const PointMarker = ({ point }: PointMarkerProps) => {

  const router = useRouter();

  const coordinates = { lat: point.lat, lng: point.lng }

  function pointMarkerClick() {
    router.push('/points/' + point.id)
  }

  return (
    <Marker
      onClick={pointMarkerClick}
      position={coordinates}
      icon={{
        url: logo.src,
        scaledSize: new google.maps.Size(40, 40)
      }}
    />
  )
}

export default PointMarker;