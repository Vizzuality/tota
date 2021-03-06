import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import snakeCase from 'lodash/snakeCase';

import THEMES from 'constants/themes';

import TotaAPI from 'services/api';
import { Theme, ThemeAPI } from 'types';

function mergeWithFrontendDefinitions(data: ThemeAPI[]): Theme[] {
  if (!data?.length) return [];

  return THEMES.map((t) => {
    const apiTheme = data.find((d) => d.slug === t.slug);
    if (!apiTheme) return null;

    return {
      ...t,
      ...apiTheme,
    };
  }).filter((x) => x);
}

export function useRouterSelectedTheme(): Theme {
  const router = useRouter();
  const { theme: themeSlug } = router.query;
  const { data: themes, isFetched } = useThemes();

  const theme = (themes || []).find((t) => t.slug === snakeCase(themeSlug as string));
  if (isFetched && themeSlug && !theme) router.push('/page-not-found');

  return theme;
}

export function useThemes() {
  const result = useQuery<ThemeAPI[], Error, Theme[]>('themes', () => TotaAPI.get('themes'), {
    keepPreviousData: true,
    staleTime: Infinity,
    placeholderData: [],
    select: useCallback(mergeWithFrontendDefinitions, []),
  });
  return {
    ...result,
    data: result.data || [],
  };
}
