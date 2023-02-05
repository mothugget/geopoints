import Image from 'next/image.js';
import React, { useEffect, useContext } from 'react';
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Coordinates, CreatePointData, List } from '../types/types';
import { MapContext } from '../contexts/MapContext';
import LoadingSpinner from './LoadingSpinner';
import PointMarker from './mapMarkers/PointMarker';
import { DisplayedPointsContext } from '../contexts/DisplayedPointsContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';
import useCreatePoint from '../hooks/useCreatePoint';

const testCoords: Coordinates[] = [
  { lat: 51.59298641280394, lng: 0.19911695761843295 },
  { lat: 51.59093347811105, lng: 0.2012627247702207 },
];

const containerStyle = {
  width: '100%',
  height: '100%',
};

const newPointDefaultData: CreatePointData = {
  title: '',
  description: '',
  isPublic: false,
  imagePath: '',
  listId: 0,
  lat: 0,
  lng: 0,
};

function Map() {
  const [currentUserLocation, setCurrentUserLocation] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const { map, setMap } = useContext(MapContext);
  const { displayedPoints } = useContext(DisplayedPointsContext);
  const { user } = useUser();
  const { data } = useUserData(user!);
  const mutation = useCreatePoint();
  const userDefaultList = data.ownLists.find(
    (list: List) => list.title === 'My Points'
  );

  useEffect(() => {
    getUserPosition();

  }, [])
  
console.log('hello')

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
      setCurrentUserLocation({ lat: latitude, lng: longitude });
    });
  }

  const handleDoubleClick = (e: google.maps.MapMouseEvent) => {
    const newPoint = {
      ...newPointDefaultData,
      listId: userDefaultList.id,
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    };

    mutation.mutate(newPoint);
  };

  if (!currentUserLocation) {
    return <LoadingSpinner />;
  }

  return isLoaded ? (
    <div className="fixed flex justify-center items-center h-full w-full top-0 left-0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentUserLocation}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={handleDoubleClick}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          rotateControl: false,
          disableDoubleClickZoom: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
          },
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          mapTypeId: 'satellite',
        }}
      >
        {displayedPoints.map((point) => {
          return <PointMarker key={point.id} point={point} />;
        })}
      </GoogleMap>
      {/* <div className="absolute z-20">
        <Image src="/crosshair.png" alt="crosshair" width={40} height={40} />
      </div> */}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default React.memo(Map);
