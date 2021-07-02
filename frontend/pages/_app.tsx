import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

import 'styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp: React.ReactNode = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
