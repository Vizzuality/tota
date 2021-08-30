import React from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash/kebabCase';
import headerBackgroundImage from 'images/themes/header-background.png';

import Hero from 'components/hero';
import Select from 'components/forms/select';
import StatisticBlock from './statistic-block';

import { useRegions } from 'hooks/regions';

import type { SelectOptionProps } from 'components/forms/select/types';

export interface ThemeMainHeaderProps {}

const statistics = [
  {
    title: 'Lorem Ipsum',
    value: 123323,
  },
  {
    title: 'Lorem Ipsum',
    value: 123323,
  },
  {
    title: 'Lorem Ipsum',
    value: 123323,
  },
  {
    title: 'Lorem Ipsum',
    value: 123323,
  },
];

const ThemeMainHeader: React.FC<ThemeMainHeaderProps> = () => {
  const router = useRouter();
  const { theme: themeSlug, region } = router.query;
  const { regions } = useRegions();
  const handleRegionChange = (value: string) => {
    if (themeSlug === 'general-insights') {
      router.push(`/themes/${value}/tourism-industry-arrivals`, undefined, { scroll: false });
    } else {
      router.push(`/themes/${value}/${themeSlug}`, undefined, { scroll: false });
    }
  };

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
            selected={region}
            onChange={handleRegionChange}
          />
        </div>
        <div className="w-full mt-20 flex justify-around items-center bg-white bg-opacity-20">
          {statistics.map((s, index) => (
            <StatisticBlock key={index} {...s} />
          ))}
        </div>
      </div>
    </Hero>
  );
};

export default ThemeMainHeader;
