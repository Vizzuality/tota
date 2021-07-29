import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

import Layout from 'layout';

import type { SelectOptionProps } from 'components/forms/select/types';

import ThemeSection from 'components/themes/section';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import Select from 'components/forms/select';

import { useRegions } from 'hooks/regions';
import themes from 'constants/themes';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { regions } = useRegions();
  const { theme: themeSlug, region } = router.query;

  const theme = themes.find((t) => t.slug === themeSlug);

  return (
    <Layout>
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && (
        <>
          <div className="fixed w-full h-16 z-30 left-0 top-20 bg-blue9">
            <div className="container m-auto flex items-center text-white">
              <div className="w-80 -ml-4">
                <Select
                  id="map-select-region"
                  theme="dark"
                  size="base"
                  options={regions.map((r): SelectOptionProps => ({ label: r.name, value: r.slug }))}
                  selected={region}
                  onChange={(value: string) =>
                    router.push(`/themes/${value}/${themeSlug}`, undefined, { scroll: false })
                  }
                />
              </div>
              {themes.map((t) => (
                <Link key={t.slug} href={`/themes/${region}/${t.slug}`}>
                  <a className={cx('px-4 py-2 h-16 text-center', { 'font-bold bg-blue10': t.slug === themeSlug })}>
                    {t.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-28">
            <ThemeHeader />
            {theme?.sections?.map((section, index) => (
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
