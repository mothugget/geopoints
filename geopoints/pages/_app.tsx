import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from '../components/Footer';
import { MapContextProvider } from '../contexts/MapContext';
import { ClickedMarkerContextProvider } from '../contexts/ClickedMarkerContext';
import { DisplayedPointsContextProvider } from '../contexts/DisplayedPointsContext';
import Header from '../components/Header';
import { ThemeProvider } from '@material-tailwind/react';
import { RoutesContextProvider } from '../contexts/RoutesContext';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== '/welcome' ? (
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ClickedMarkerContextProvider>
                <DisplayedPointsContextProvider>
                  <MapContextProvider>
                    <RoutesContextProvider>
                      <Header />
                      <Footer />
                      <Component {...pageProps} />
                    </RoutesContextProvider>
                  </MapContextProvider>
                </DisplayedPointsContextProvider>
              </ClickedMarkerContextProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </UserProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
