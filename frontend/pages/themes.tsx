import kebabCase from 'lodash/kebabCase';
import { useRouter } from 'next/router';

import { THEMES } from 'constants/themes';

const News: React.FC<void> = (): JSX.Element => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push(`/themes/british-columbia/${kebabCase(THEMES[0].slug)}`);
  }

  return null;
};

export default News;
