import { useCallback } from 'react';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { THEMES } from 'constants/themes';
import { Region, Widget, WidgetAPI } from 'types';

import TotaAPI from 'services/api';

function mergeWithFrontendDefinitions(themeSlug: string, data: WidgetAPI[]): Widget[] {
  if (!data?.length) return [];

  const theme = THEMES.find((t) => t.slug === themeSlug);

  return theme.widgets
    .map((w) => {
      const apiWidget = data.find((d) => d.slug === w.slug);
      if (!apiWidget) return null;

      return {
        ...w,
        ...apiWidget,
      };
    })
    .filter((x) => x);
}

export function useWidgets(themeSlug: string, selectedRegion?: Region) {
  const result = useQuery<WidgetAPI[], Error, Widget[]>(
    ['widgets', { themeSlug }],
    () => TotaAPI.get(`widgets?filter[theme_slug]=${themeSlug}`),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      placeholderData: [],
      select: useCallback(
        (data: WidgetAPI[]) => {
          return orderBy(
            mergeWithFrontendDefinitions(themeSlug, data).filter((w) =>
              w.regions_whitelist ? w.regions_whitelist.includes(selectedRegion?.slug) : true,
            ),
            'position',
          );
        },
        [themeSlug, selectedRegion],
      ),
    },
  );
  return {
    ...result,
    data: result.data || [],
  };
}
