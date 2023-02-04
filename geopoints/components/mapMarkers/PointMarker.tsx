import { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { Marker } from '@react-google-maps/api';
import { Easing, Tween, update } from "@tweenjs/tween.js";

import { Point } from '../../types/types';
import logo from '../../public/geopoints-logo-contrasted.png'
import { MapContext } from '../../contexts/MapContext';

interface PointMarkerProps {
  point: Point
}

const PointMarker = ({ point }: PointMarkerProps) => {
  const [showPointModal, setShowPointModal] = useState(false)

  const router = useRouter();
  const { map } = useContext(MapContext);

  const coordinates = { lat: point.lat, lng: point.lng }

  const latLangCoordinates = new google.maps.LatLng(point.lat, point.lng)

  const cameraOptions: google.maps.CameraOptions = {
    center: map?.getCenter(),
  };

  const focusOnPoint = new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
    .to({ center: latLangCoordinates }, 1000) // Move to destination in 1 second.
    .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
      console.log(cameraOptions.center?.lng(),' ',latLangCoordinates.lng())
      map?.moveCamera(cameraOptions);
    })
    .start();

  // function pointMarkerClick() {
  //   function animate(time: number) {
  //     requestAnimationFrame(animate);
  //     update(time);
  //   }

  //   requestAnimationFrame(animate);
  //   setShowPointModal(true)
  // }
  
  function pointMarkerClick() {
    map?.moveCamera({center: latLangCoordinates})
    setShowPointModal(true)
  }



  return (
    <>
      <Marker
        onClick={pointMarkerClick}
        position={coordinates}
        icon={{
          url: logo.src,
          scaledSize: new google.maps.Size(40, 40)
        }}
      />
      <div className='h-50 w-50 bg-black fixed top-0 z-50' />
    </>
  )
}

export default PointMarker;