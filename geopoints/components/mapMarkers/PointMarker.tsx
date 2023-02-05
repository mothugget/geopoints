import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Marker } from '@react-google-maps/api';
import { Point } from '../../types/types';
// import EditPointDropdown from './EditPointDropDown';
import logo from '../../public/geopoints-logo-contrasted.png';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';

interface PointMarkerProps {
  point: Point;
}

const PointMarker = ({ point }: PointMarkerProps) => {
  const router = useRouter();
  const { setClickedPointId } =
    useContext(ClickedMarkerContext);

  const coordinates = { lat: point.lat, lng: point.lng };

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
