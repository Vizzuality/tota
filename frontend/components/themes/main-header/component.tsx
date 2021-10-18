import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import orderBy from 'lodash/orderBy';
import headerBackgroundImage from 'images/themes/header-background.png';

import Hero from 'components/hero';
import Select from 'components/forms/select';
import StatisticBlock from './statistic-block';

import { useRegions, useRouterSelectedRegion } from 'hooks/regions';
import { useRouterSelectedTheme } from 'hooks/themes';

import type { SelectOptionProps } from 'components/forms/select/types';
import { useIndicatorValues } from 'hooks/indicators';

import { format, parseISO } from 'date-fns';

export interface ThemeMainHeaderProps {}

const STATISTICS = [
  {
    title: 'Size',
    subtitle: 'km2',
    indicator: 'size_tourism_region_km2',
  },
  {
    title: 'Population',
    indicator: 'population_by_tourism_region',
  },
  {
    title: 'Tourism employment',
    indicator: 'tourism_employment_by_tourism_region_monthly',
  },
  {
    title: 'Total employment',
    indicator: 'total_employment_by_tourism_region_monthly',
  },
];

const ThemeMainHeader: React.FC<ThemeMainHeaderProps> = () => {
  const router = useRouter();
  const theme = useRouterSelectedTheme();
  const selectedRegion = useRouterSelectedRegion();
  const { isFetched, isFetching, data } = useIndicatorValues({
    slug: STATISTICS.map((x) => x.indicator),
    region: selectedRegion.name,
  });
  const { regions } = useRegions();
  const handleRegionChange = (value: string) => {
    if (theme.slug === 'general-insights') {
      router.push(`/themes/${value}/tourism-industry-arrivals`, undefined, { scroll: false });
    } else {
      router.push(`/themes/${value}/${theme.slug}`, undefined, { scroll: false });
    }
  };
  const statistics = useMemo(() => {
    if (isFetched && data) {
      const latestFirst = orderBy(data, ['date'], ['desc']);

      return STATISTICS.map(({ title, subtitle, indicator }) => {
        const data = latestFirst.filter((x) => x.indicator === indicator)[0];
        let parsedDate = null;
        if (data && data.date) {
          const isYear = /^\d{4}$/;
          if (isYear.test(data.date)) {
            parsedDate = data.date;
          } else {
            parsedDate = format(parseISO(data.date), 'MMM y');
          }
        }

        return {
          title,
          subtitle: subtitle || parsedDate,
          value: data?.value?.toLocaleString(),
        };
      });
    }

    return STATISTICS.map(({ title }) => ({ title }));
  }, [isFetched, data]);

  return (
    <Hero image={headerBackgroundImage}>
      <div className="container m-auto flex flex-col items-center justify-center text-white">
        <div className="mt-10">
          <Select
            id="themes-main-header-region"
            theme="transparent"
            size="base"
            maxHeight={400}
            options={regions.map((r): SelectOptionProps => ({ label: r.name, value: kebabCase(r.slug) }))}
            selected={kebabCase(selectedRegion.slug)}
            onChange={handleRegionChange}
          />
        </div>
        <div className="w-full mt-20 flex justify-around items-center bg-white bg-opacity-20">
          {statistics.map((s, index) => (
            <StatisticBlock key={index} loading={isFetching} {...s} />
          ))}
        </div>
      </div>
    </Hero>
  );
};

export default ThemeMainHeader;
