import Head from 'next/head';
import { useState } from 'react';
import MapComponent from 'components/main-map';
import MapMenu from 'components/map-menu';

import Layout from 'layout';

import LAYERS from 'components/main-map/layers';

const Map: React.FC<void> = (): JSX.Element => {
  const [activeLayers, setActiveLayers] = useState(['tourism_regions']);
  const handleActiveLayersChange = (layers) => setActiveLayers(layers);

  return (
    <Layout navbarTheme="gray" navbarPosition="fixed" className="w-full" hideFooter>
      <Head>
        <title>Map</title>
      </Head>
      <div className="w-full h-screen-minus-header">
        <MapMenu
          layers={LAYERS.filter((l) => l.id !== 'tourism_regions')}
          activeLayers={activeLayers}
          onActiveLayersChange={handleActiveLayersChange}
        />
        <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />;
      </div>
    </Layout>
  );
};

export default Map;
