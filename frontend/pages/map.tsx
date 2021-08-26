import Head from 'next/head';
import MapComponent from 'components/main-map';
import MapMenu from 'components/map-menu';
import { MapProvider } from 'hooks/map';

import Layout from 'layout';

const Map: React.FC<void> = (): JSX.Element => {
  return (
    <Layout navbarTheme="gray" navbarPosition="fixed" className="w-full" hideFooter>
      <Head>
        <title>Map</title>
      </Head>
      <div className="w-full h-screen-minus-header">
        <MapProvider>
          <MapMenu />
          <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />
        </MapProvider>
      </div>
    </Layout>
  );
};

export default Map;
