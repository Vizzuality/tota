import kebabCase from 'lodash/kebabCase';
import { useRouter } from 'next/router';

import { THEMES } from 'constants/themes';

const ThemesRegionIndex: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { region } = router.query;

  if (typeof window !== 'undefined' && region) {
    const theme = THEMES.filter((t) => (region !== 'british-columbia' ? t.slug !== 'general_insights' : true))[0];
    router.push(`/themes/${region}/${kebabCase(theme.slug)}`);
  }

  return null;
};

export default ThemesRegionIndex;
