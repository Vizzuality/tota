import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import type { SelectOptionProps } from 'components/forms/select/types';
import Select from 'components/forms/select';

import { useRegions } from 'hooks/regions';
import { useThemes } from 'hooks/themes';

export interface ThemeNavbarProps {}

const ThemeNavbar: React.FC<ThemeNavbarProps> = () => {
  const [fixed, setFixed] = useState(false);
  const router = useRouter();
  const { theme: themeSlug, region } = router.query;
  const { data: regions } = useRegions();
  const { data: themes } = useThemes();
  // TODO: refactor this
  const filteredThemes = themes.filter(
    (t) => region === 'british-columbia' || (region !== 'british-columbia' && t.slug !== 'general_insights'),
  );
  const handleRegionChange = (regionSlug: string) => {
    if (themeSlug === 'general-insights') {
      router.push(`/themes/${regionSlug}/tourism-industry-arrivals`, undefined, { scroll: false });
    } else {
      router.push(`/themes/${regionSlug}/${kebabCase(themeSlug as string)}`, undefined, { scroll: false });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 600) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className={cx('hidden lg:block w-full h-18 z-30 bg-blue-800', { 'fixed top-24': fixed })}>
        <div className="container m-auto flex items-center text-white">
          <div className="w-72 -ml-4">
            <Select
              id="map-select-region"
              theme="dark"
              size="lg"
              maxHeight={400}
              options={regions.map((r): SelectOptionProps => ({ label: r.name, value: kebabCase(r.slug) }))}
              selected={region}
              onChange={handleRegionChange}
            />
          </div>
          <div className="w-0 border-r-2 h-16"></div>
          {filteredThemes.map((t) => (
            <Link key={t.slug} href={`/themes/${region}/${kebabCase(t.slug as string)}`}>
              <a
                className={cx({
                  'px-4 py-2 text-sm h-16 hover:bg-blue-900': true,
                  'flex-1 flex items-center justify-center text-center': true,
                  'font-bold bg-blue-900': kebabCase(t.slug) === themeSlug,
                })}
              >
                {t.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
      {/* Dummy element to avoid jumps */}
      {fixed && <div className="hidden lg:block w-full h-20" />}
    </>
  );
};

export default ThemeNavbar;
