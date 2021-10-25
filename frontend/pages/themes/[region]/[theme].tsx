import React from 'react';
import Head from 'next/head';

import Layout from 'layout';

import ThemeMainHeader from 'components/themes/main-header';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import ThemeSections from 'components/themes/sections';
import ThemesNavbar from 'components/themes/navbar';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRegions } from 'hooks/regions';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const theme = useRouterSelectedTheme();
  const { regions } = useRegions();

  return (
    <Layout className="w-full">
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && regions.length && (
        <>
          <ThemeMainHeader />
          <ThemesNavbar />
          <div className="container mx-auto">
            <ThemeHeader />
            <ThemeSections />
            <ThemeMobileFooter />
          </div>
        </>
      )}
    </Layout>
  );
};

export default ThemePage;
