import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useUserData } from '../hooks/useUserData';
import Map from '../components/Map';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickedMarkerDialog from '../components/MapMarkers/ClickedMarkerDialog';

export default withPageAuthRequired(function Home() {

  const router = useRouter();
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  if (isLoading) {
    return <LoadingSpinner />;
  }


  
  const urlCoord = { lat: Number(router.query.lat), lng: Number(router.query.lng) }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
  // urlCoordinates = { router.query.coordinates }
  return (
    <main className="flex flex-col h-full justify-between bg-white">
      <section className="mb-auto">
        <ClickedMarkerDialog />
        <Map urlCoord={urlCoord}/>
      </section>
    </main>
  );
});
