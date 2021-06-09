import type { AppProps } from 'next/app';

import 'styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp: React.ReactNode = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
