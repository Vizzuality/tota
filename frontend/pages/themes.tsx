import { useRouter } from 'next/router';

import themes from 'constants/themes';

const News: React.FC<void> = (): JSX.Element => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push(`/themes/${themes[0].slug}`);
  }

  return null;
};

export default News;
