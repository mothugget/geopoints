import Image from 'next/image.js';
import React, { useContext } from 'react';
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Coordinates } from '../types/types';
import { MapContext } from '../contexts/MapContext';
import LoadingSpinner from './LoadingSpinner';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map() {
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Coordinates | null>(null);
  const { map, setMap } = useContext(MapContext);

  getUserPosition();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(currentUserLocation);
      map.fitBounds(bounds);
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
        h-screen
        w-screen
        top-0
        left-0
        "
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentUserLocation}
        zoom={5}
        onLoad={onLoad}
        // onLoad={(map)=>{}}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
          },
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
        }}
      >
        {/* <Marker position={center}>

                </Marker> */}
        <></>
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
