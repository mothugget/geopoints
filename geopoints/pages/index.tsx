import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import Map from '../components/Map';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ClickedMarkerDialog from '../components/mapMarkers/ClickedMarkerDialog';

export default withPageAuthRequired(function Home() {
  const [shouldRoutesBeShown, setShouldRoutesBeShown] = useState(false);
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
        <ClickedMarkerDialog setShouldRoutesBeShown={setShouldRoutesBeShown} />
        <Map shouldRoutesBeShown={shouldRoutesBeShown} />
      </section>
    </main>
  );
});
