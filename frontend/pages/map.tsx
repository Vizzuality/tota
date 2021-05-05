import MapComponent from 'components/map';

const Map: React.FC<void> = (): JSX.Element => {
  return <MapComponent mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} />;
};

export default Map;
