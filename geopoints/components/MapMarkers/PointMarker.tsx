import { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import { Point } from '../../types/types';
import logo from '../../public/geopoints-logo-contrasted.png';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';

interface PointMarkerProps {
  point: Point;
}

const PointMarker = ({ point }: PointMarkerProps) => {
  const { setClickedPoint } = useContext(ClickedMarkerContext);

  const coordinates = { lat: point.lat, lng: point.lng };

  const handleClick = () => {
    if (setClickedPoint && point) {
      setClickedPoint(point);
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
