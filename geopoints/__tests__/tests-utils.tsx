import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-tailwind/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ClickedMarkerContextProvider } from '../contexts/ClickedMarkerContext';
import { DisplayedPointsContextProvider } from '../contexts/DisplayedPointsContext';
import { MapContextProvider } from '../contexts/MapContext';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ClickedMarkerContextProvider>
            <DisplayedPointsContextProvider>
              <MapContextProvider>{children}</MapContextProvider>
            </DisplayedPointsContextProvider>
          </ClickedMarkerContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

const customRender = (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: AllTheProviders });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

