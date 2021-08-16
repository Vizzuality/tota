import React from 'react';
import { useRouter } from 'next/router';
import headerBackgroundImage from 'images/themes/header-background.png';

import type { SelectOptionProps } from 'components/forms/select/types';
import Select from 'components/forms/select';

import { useRegions } from 'hooks/regions';
export interface ThemeMainHeaderProps {}

export interface MainStatProps {
  title: string;
  value: number;
}

const MainStat: React.FC<MainStatProps> = ({ title, value }: MainStatProps) => {
  return (
    <div className="text-white py-16">
      <div className="font-bold text-2xl uppercase">{title}</div>
      <div className="mt-5 font-bold text-3xl">{value}</div>
    </div>
  );
};

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
  const stats = [
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

  return (
    <div
      className="w-full pt-40 bg-cover"
      style={{
        backgroundImage: `url(${headerBackgroundImage})`,
        height: 700,
      }}
    >
      <div className="container m-auto flex flex-col items-center justify-center text-white">
        <div className="mt-10">
          <Select
            id="themes-main-header-region"
            theme="transparent"
            size="base"
            maxHeight={400}
            options={regions.map((r): SelectOptionProps => ({ label: r.name, value: r.slug }))}
            selected={region}
            onChange={handleRegionChange}
          />
        </div>
        <div className="w-full mt-20 flex justify-around items-center bg-white bg-opacity-20">
          {stats.map((stat) => (
            <MainStat key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeMainHeader;
