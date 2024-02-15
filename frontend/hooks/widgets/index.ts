import { useCallback } from 'react';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { THEMES } from 'constants/themes';
import { Region, Widget, WidgetAPI } from 'types';

import TotaAPI from 'services/api';

function mergeWithFrontendDefinitions(themeSlug: string, data: WidgetAPI[]): Widget[] {
  if (!data?.length) return [];

  console.log({ data, themeSlug });

  const theme = THEMES.find((t) => t.slug === themeSlug);

  console.log({ theme });

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
    () => {
      const slug =
        themeSlug === 'tourism_industry_arrivals' ? 'tourism_industry_arrivals,airport_information' : themeSlug;
      return TotaAPI.get(`widgets?filter[theme_slug]=${slug}`);
    },
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
          ) as Widget[];
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
