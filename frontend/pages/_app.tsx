import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider, QueryClient } from 'react-query';

import 'styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp: React.ReactNode = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
