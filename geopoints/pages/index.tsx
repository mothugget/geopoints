import { useContext } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useQuery } from 'react-query';
import { UserDataContext } from '../contexts/UserDataContext';
import Map from '../components/Map';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import fetchDataAndSetContext from '../util/fetchDataAndSetContext';

export default withPageAuthRequired(function Home() {
  const { userData, setUserData } = useContext(UserDataContext);
  const { user } = useUser();

  const { isError, isLoading, error } = useQuery(
    ['fectchUserData', user!],
    async () => fetchDataAndSetContext(user!, setUserData)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  console.log(userData);
  return (
    <main className="flex flex-col h-screen justify-between bg-white">
      <Header />
      <section className="mb-auto">
        <Map />
      </section>
    </main>
  );
});
