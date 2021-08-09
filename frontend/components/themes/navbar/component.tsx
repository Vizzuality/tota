import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

import themes from 'constants/themes';

import type { SelectOptionProps } from 'components/forms/select/types';
import Select from 'components/forms/select';

import { useRegions } from 'hooks/regions';
export interface ThemeHeaderProps {}

const ThemeHeader: React.FC<ThemeHeaderProps> = () => {
  const router = useRouter();
  const { theme: themeSlug, region } = router.query;
  const { regions } = useRegions();
  // TODO: refactor this
  const filteredThemes = themes.filter(
    (t) => region === 'british-columbia' || (region !== 'british-columbia' && t.slug !== 'general-insights'),
  );
  const handleRegionChange = (value: string) => {
    if (themeSlug === 'general-insights') {
      router.push(`/themes/${value}/tourism-industry-arrivals`, undefined, { scroll: false });
    } else {
      router.push(`/themes/${value}/${themeSlug}`, undefined, { scroll: false });
    }
  };

  return (
    <div className="fixed w-full h-16 z-30 left-0 top-20 bg-blue9">
      <div className="container m-auto flex items-center text-white">
        <div className="w-80 -ml-4">
          <Select
            id="map-select-region"
            theme="dark"
            size="base"
            maxHeight={400}
            options={regions.map((r): SelectOptionProps => ({ label: r.name, value: r.slug }))}
            selected={region}
            onChange={handleRegionChange}
          />
        </div>
        <div className="w-0 border-r-2 h-16"></div>
        {filteredThemes.map((t) => (
          <Link key={t.slug} href={`/themes/${region}/${t.slug}`}>
            <a
              className={cx('px-4 py-2 h-16 flex-1 flex items-center justify-center text-center', {
                'font-bold bg-blue10': t.slug === themeSlug,
              })}
            >
              {t.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThemeHeader;
