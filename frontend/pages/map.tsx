import Head from 'next/head';
import MapComponent from 'components/main-map';
import MapMenu from 'components/map-menu';
import { MapProvider } from 'hooks/map';

import Layout from 'layout';

const Map: React.FC<void> = (): JSX.Element => {
  return (
    <Layout
      navbarHeader="The Tourism Impact Portal"
      navbarTheme="gray"
      navbarPosition="relative"
      className="w-full"
      hideFooter
    >
      <Head>
        <title>Map | Tourism Impact Portal</title>
        <meta
          name="description"
          content="A central place providing key insights about tourism development in the province to support well-informed decisions for a sustainable future."
        />
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
