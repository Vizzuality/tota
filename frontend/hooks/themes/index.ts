import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import snakeCase from 'lodash/snakeCase';

import { THEMES_CATEGORIES, THEMES } from 'constants/themes';

import TotaAPI from 'services/api';
import { Theme, ThemeAPI, ThemeCategoriesAPI } from 'types';

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

function mergeWithFrontendDefinitionsByCategories(data: ThemeAPI[]): ThemeCategoriesAPI[] {
  if (!data?.length) return [];

  return THEMES_CATEGORIES.map((category) => ({
    ...category,

    ...(category.children && {
      children: category.children
        .map((t) => {
          const apiTheme = data.find((d) => d.slug === t.slug);
          if (!apiTheme) return null;

          return {
            ...t,
            ...apiTheme,
          };
        })
        .filter((x) => x),
    }),
  }));
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

export function useThemesCategories() {
  const result = useQuery<ThemeAPI[], Error, ThemeCategoriesAPI[]>('themes', () => TotaAPI.get('themes'), {
    keepPreviousData: true,
    staleTime: Infinity,
    placeholderData: [],
    select: useCallback(mergeWithFrontendDefinitionsByCategories, []),
  });

  return {
    ...result,
    data: result.data || [],
  };
}
