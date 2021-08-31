import { useRouter } from 'next/router';

import themes from 'constants/themes';

const ThemesRegionIndex: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { region } = router.query;

  if (typeof window !== 'undefined' && region) {
    router.push(`/themes/${region}/${themes[0].slug}`);
  }

  return null;
};

export default ThemesRegionIndex;
