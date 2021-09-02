import { useRouter } from 'next/router';

import themes from 'constants/themes';

export function useRouterSelectedTheme() {
  const router = useRouter();
  const { theme: themeSlug } = router.query;

  return themes.find((t) => t.slug === themeSlug);
}
