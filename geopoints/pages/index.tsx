import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useUserData } from '../hooks/useUserData';
import Map from '../components/Map';
import { MapContext } from '../contexts/MapContext';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickedMarkerDialog from '../components/MapMarkers/ClickedMarkerDialog';
import { useContext, useEffect } from 'react';

export default withPageAuthRequired(function Home() {

  const router = useRouter();
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);
  const { map } = useContext(MapContext);
  const urlCoord = { lat: Number(router.query.lat), lng: Number(router.query.lng) }
  const cameraOptions: google.maps.CameraOptions = {
    center: urlCoord,
  };

  useEffect(() => { setTimeout(() => { if (router.query.lat) { map?.moveCamera(cameraOptions); } }, 5000)},[map])
  useEffect(() => {  if (router.query.lat) { map?.moveCamera(cameraOptions) }}, [])

  if (isLoading) {
    return <LoadingSpinner />;
  }




  
function goToPoint() {
    map?.moveCamera(cameraOptions);
  
}


  if (router.query.lat) { map?.moveCamera(cameraOptions); }


  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
 
  return (
    <main className="flex flex-col h-full justify-between bg-white">
      <section className="mb-auto">
        <ClickedMarkerDialog />
        <Map />
        {/* {router.query.lat&&<button className='fixed top-48 left-0' onClick={goToPoint}>IIIIMMMHEEEREWEE</button>} */}
      </section>
    </main>
  );
});
