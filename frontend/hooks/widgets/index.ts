import { useCallback } from 'react';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import themes from 'constants/themes';
import { Region, Widget, WidgetAPI } from 'types';

import TotaAPI from 'services/api';

function mergeWithFrontendDefinitions(themeSlug: string, data: WidgetAPI[]): Widget[] {
  if (!data?.length) return [];

  const theme = themes.find((t) => t.slug === themeSlug);

  return theme.widgets.map((w) => ({
    ...w,
    ...data.find((d) => d.slug === w.slug),
  }));
}

export function useWidgets(themeSlug: string, selectedRegion?: Region) {
  const result = useQuery<WidgetAPI[], Error, Widget[]>(
    ['widgets', { themeSlug }],
    () => TotaAPI.get(`widgets?filter[theme.slug]=${themeSlug}`),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      placeholderData: [],
      select: useCallback(
        (data: WidgetAPI[]) => {
          return orderBy(
            mergeWithFrontendDefinitions(themeSlug, data).filter((w) => (w.display ? w.display(selectedRegion) : true)),
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
