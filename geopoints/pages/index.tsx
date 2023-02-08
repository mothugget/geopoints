import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';
import Map from '../components/Map';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickedMarkerDialog from '../components/MapMarkers/ClickedMarkerDialog';

export default withPageAuthRequired(function Home() {
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  return (
    <main className="flex flex-col h-screen justify-between bg-white">
      <Header />
      <section className="mb-auto">
        <ClickedMarkerDialog />
        <Map />
      </section>
    </main>
  );
});
