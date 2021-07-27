import Head from 'next/head';
import MapComponent from 'components/main-map';
import MapMenu from 'components/map-menu';

import Layout from 'layout';

const Map: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Map</title>
      </Head>
      <div className="w-full h-screen-minus-header">
        <MapMenu />
        <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />;
      </div>
    </Layout>
  );
};

export default Map;
