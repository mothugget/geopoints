import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from '../components/Footer';
import { UserDataContextProvider } from '../contexts/UserDataContext';
import { MapContextProvider } from '../contexts/MapContext';
import Header from '../components/Header';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <UserDataContextProvider>
          <MapContextProvider>
            <Header />
            <Footer />
            <Component {...pageProps} />
          </MapContextProvider>
        </UserDataContextProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
