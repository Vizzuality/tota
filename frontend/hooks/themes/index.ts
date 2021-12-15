import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import snakeCase from 'lodash/snakeCase';

import themes from 'constants/themes';

import TotaAPI from 'services/api';
import { Theme, ThemeAPI } from 'types';

function mergeWithFrontendDefinitions(data: ThemeAPI[]): Theme[] {
  if (!data?.length) return [];

  return themes.map((t) => {
    return {
      ...t,
      ...data.find((d) => d.slug === t.slug),
    };
  });
}

export function useRouterSelectedTheme(): Theme {
  const router = useRouter();
  const { theme: themeSlug } = router.query;
  const { data: themes } = useThemes();

  return (themes || []).find((t) => t.slug === snakeCase(themeSlug as string));
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
