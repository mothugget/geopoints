import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Marker } from '@react-google-maps/api';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { Point } from '../../types/types';
import { MapContext } from '../../contexts/MapContext';
// import EditPointDropdown from './EditPointDropDown';
import logo from '../../public/geopoints-logo-contrasted.png';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';

interface PointMarkerProps {
  point: Point;
}

const PointMarker = ({ point }: PointMarkerProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { map, setShowPointModal, setFocusedPoint } = useContext(MapContext);
  const { clickedPointId, setClickedPointId } =
    useContext(ClickedMarkerContext);

  const coordinates = { lat: point.lat, lng: point.lng };

  const latLangCoordinates = new google.maps.LatLng(point.lat, point.lng);

  const cameraOptions: google.maps.CameraOptions = {
    center: map?.getCenter(),
  };

  const focusOnPoint = new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
    .to({ center: latLangCoordinates }, 1000) // Move to destination in 1 second.
    .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
      console.log(cameraOptions.center?.lng(), ' ', latLangCoordinates.lng());
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

  // function pointMarkerClick() {
  //   map?.moveCamera({ center: latLangCoordinates });

  //   setShowPointModal && setShowPointModal(true);
  //   setFocusedPoint && setFocusedPoint(point);
  // }
  const handleClick = () => {
    // open up modal asking for editing, show route, delete
    // pass pointId to it
    if (setClickedPointId && point && point.id) {
      setClickedPointId(point.id);
    }
  };

  return (
      <Marker
        onClick={handleClick}
        position={coordinates}
        icon={{
          url: logo.src,
          scaledSize: new google.maps.Size(40, 40),
        }}
      />
  );
};

export default PointMarker;
