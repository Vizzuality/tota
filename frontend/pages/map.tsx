import Head from 'next/head';
import MapComponent from 'components/map';
import Layout from 'layout';

const Map: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Map</title>
      </Head>
      <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />;
    </Layout>
  );
};

export default Map;
