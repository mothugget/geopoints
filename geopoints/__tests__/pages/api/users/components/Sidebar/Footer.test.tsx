import {render, screen} from '@testing-library/react';
import Footer from '../../../../../../components/Footer';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "react-query";


describe ('Footer', () => {
  const queryClient = new QueryClient();

  it('renders an image with my icon\'s url', () => {
    render(
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Footer />
        </QueryClientProvider>
      </UserProvider>
    );

    const image = screen.getByAltText('home logo');
    expect(image.getAttribute("src")).toContain("geopoints-logo.png");
  }),

  it('renders a button that says NEW', () => {
    render(
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Footer />
        </QueryClientProvider>
      </UserProvider>
    );

    const button = screen.getByText(/NEW/);
    console.log("HEREEEEEEEEEEEE", button)
    expect(button).toBeInTheDocument();
  })
})