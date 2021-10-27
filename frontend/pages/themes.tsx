import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';

import TotaAPI from 'services/api';

import themes from 'constants/themes';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('regions', () => TotaAPI.get('/regions?filter[region_type]=province,tourism_region'));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Themes: React.FC<void> = (): JSX.Element => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push(`/themes/british-columbia/${themes[0].slug}`);
  }

  return null;
};

export default Themes;
