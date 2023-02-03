import Image from 'next/image.js';
import React, { useContext } from 'react';
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Coordinates } from '../types/types';
import { MapContext } from '../contexts/MapContext';
import LoadingSpinner from './LoadingSpinner';
import PointMarker from './mapMarkers/PointMarker';
import { DisplayedPointsContext } from '../contexts/DisplayedPointsContext';
import logo from '../public/geopoints-logo-contrasted.png'
import svg from '../node_modules/svg-icon/dist/svg/'
import AdbIcon from '@mui/icons-material/Adb';


const testCoords: Coordinates[] = [{lat: 51.59298641280394, lng: 0.19911695761843295}, {lat: 51.59093347811105, lng: 0.2012627247702207}]

const containerStyle = {
  width: '100%',
  height: '100%',
};



function Map() {
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Coordinates | null>(null);
  const { map, setMap } = useContext(MapContext);
  const { displayedPoints } = useContext(DisplayedPointsContext)

  const displayedPointCoordinates: Coordinates[] = displayedPoints.map((point)=>{
    return {lat:point.lat, lng:point.lng}
  })
 logo
console.log(displayedPointCoordinates)
  console.log(svg)
  getUserPosition();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(currentUserLocation);
      map.setZoom(16);
      if (setMap) {
        setMap(map);
      }
    },
    [currentUserLocation, setMap]
  );

  const onUnmount = useCallback(
    function callback(map: google.maps.Map) {
      if (setMap) {
        setMap(null);
      }
    },
    [setMap]
  );

  function getUserPosition() {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const { latitude, longitude } = geolocation.coords;
      if (!currentUserLocation) {
        setCurrentUserLocation({ lat: latitude, lng: longitude });
      }
    });
  }

  if (!currentUserLocation) {
    return <LoadingSpinner />;
  }

  return isLoaded ? (
    <div
      className="
        fixed
        flex
        justify-center
        items-center
        h-full
        w-full
        top-0
        left-0
        "
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentUserLocation}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          rotateControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
          },
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          mapTypeId: 'satellite'
        }}
      >
        <>
        {displayedPointCoordinates.map((coords, i) => {
          return <Marker key={i} icon={{
            url: logo.src,
            scaledSize: new google.maps.Size(40, 40)
          }} position={coords}/>
        })}
        {/* <Marker icon={{
          url: svgSource.src,
          scaledSize: new google.maps.Size(32, 32)
          }} position={{lat: 51.59298641280394, lng: 0.19911695761843295}}
        /> */}
        </>
      </GoogleMap>
      <div className="absolute z-20">
        <Image src="/crosshair.png" alt="crosshair" width={40} height={40} />
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default React.memo(Map);
