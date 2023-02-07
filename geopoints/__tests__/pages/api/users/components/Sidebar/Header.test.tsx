import {screen, render} from '@testing-library/react';
import Header from '../../../../../../components/Header';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from 'react-query';

describe ('Header', () => {
  const queryClient = new QueryClient();

  it('displays a search button', () => {
    render(<UserProvider><QueryClientProvider client={queryClient}><Header/></QueryClientProvider></UserProvider>)

    const searchIcon = screen.getByAltText(/Search icon/i);
    const button = searchIcon.parentNode;

    expect(button).toBeTruthy();
  })

  it('displays a search bar when clicking the search icon', () => {
    
  })

})