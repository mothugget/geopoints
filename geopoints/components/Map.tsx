import React from 'react';
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image.js';

import { Coordinates } from '../types/types'

import { Marker } from '@react-google-maps/api';
import LoadingSpinner from './LoadingSpinner';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

let lat: number | undefined = 0;
let lng: number | undefined = 0

function Map() {
  const [center, setCenter] = useState<Coordinates | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  getUserPosition();

  function logCoordinates() {
    console.log(lat,' ',lng)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      map.addListener("center_changed", () => {
        lat = map.getCenter()?.lat()
        lng = map.getCenter()?.lng()
      })
      setMap(map);
    },
    [center]
  );



  // if (map) { console.log(map.getCenter()?.lat())}

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  function getUserPosition() {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const { latitude, longitude } = geolocation.coords;
      if (!center) {
        setCenter({ lat: latitude, lng: longitude });
      }
    });
  }

  if (!center) {
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
        center={center}
        zoom={10}
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
        <Image
          src="/crosshair.png"
          alt="crosshair"
          width={40}
          height={40}
        />
      </div>
      <button className="absolute z-20" onClick={logCoordinates}>Log coordinates</button>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
