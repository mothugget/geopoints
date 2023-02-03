import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from '../components/Footer';
import { MapContextProvider } from '../contexts/MapContext';
import { DisplayedPointsContextProvider } from '../contexts/DisplayedPointsContext';
import Header from '../components/Header';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <DisplayedPointsContextProvider>
          <MapContextProvider>
            <Header />
            <Footer />
            <Component {...pageProps} />
          </MapContextProvider>
        </DisplayedPointsContextProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
