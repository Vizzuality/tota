import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from 'layout';

import type { SelectOptionProps } from 'components/forms/select/types';

import ThemeSection from 'components/themes/section';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import Select from 'components/forms/select';

import { useSelectedRegion } from 'hooks/regions';
import themes from 'constants/themes';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { regions, selectRegion, selectedRegion } = useSelectedRegion();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <Layout>
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && (
        <>
          <div className="fixed w-full h-16 z-30 left-0 top-20 bg-color1">
            <div className="container m-auto flex items-center text-white">
              <div className="w-64">
                <Select
                  id="map-select-region"
                  theme="darkBorderless"
                  size="base"
                  options={regions.map((r): SelectOptionProps => ({ label: r.title, value: r.id }))}
                  initialSelected={selectedRegion ? (selectedRegion as unknown as string) : ''}
                  onChange={(value: string) => selectRegion({ id: parseInt(value, 10) })}
                />
              </div>
              {themes.map((theme) => (
                <Link key={theme.slug} href={`/themes/${theme.slug}`}>
                  <a className="mx-5 py-2 h-16 text-center font-bold">{theme.title}</a>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-28">
            <ThemeHeader />

            {theme.sections &&
              theme.sections.map((section, index) => (
                <ThemeSection key={section.title} index={index + 1} section={section} />
              ))}
            <ThemeMobileFooter />
          </div>
        </>
      )}
    </Layout>
  );
};

export default ThemePage;
