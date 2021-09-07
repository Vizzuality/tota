import Head from 'next/head';
import MapComponent from 'components/main-map';
import MapMenu from 'components/map-menu';
import { MapProvider } from 'hooks/map';

import Layout from 'layout';

const Map: React.FC<void> = (): JSX.Element => {
  return (
    <Layout navbarTheme="gray" navbarPosition="relative" className="w-full" hideFooter>
      <Head>
        <title>Map</title>
      </Head>
      <MapProvider>
        <div className="w-full flex h-screen-minus-header">
          <MapMenu />
          <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />
        </div>
      </MapProvider>
    </Layout>
  );
};

export default Map;
