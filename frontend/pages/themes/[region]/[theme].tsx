import React from 'react';
import Head from 'next/head';

import Layout from 'layout';

import ThemeMainHeader from 'components/themes/main-header';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import ThemeWidgets from 'components/themes/widgets';
import ThemesNavbar from 'components/themes/navbar';
import AdditionalResources from 'components/themes/additional-resources';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRegions, useRouterSelectedRegion } from 'hooks/regions';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const theme = useRouterSelectedTheme();
  const region = useRouterSelectedRegion();
  const { data: regions } = useRegions();
  const dataReady = theme && regions.length > 0;
  const title = region && theme ? `${region.name} - ${theme.title}` : 'Theme';

  return (
    <Layout className="w-full">
      <Head>
        <title>{title} | British Columbia Regional Tourism Secretariat (BCRTS)</title>
      </Head>

      <ThemeMainHeader />
      <ThemesNavbar />
      <div className="sm:container sm:mx-auto">
        {dataReady && (
          <>
            <ThemeHeader />
            {theme.slug === 'additional_resources' ? <AdditionalResources /> : <ThemeWidgets />}
            <ThemeMobileFooter />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ThemePage;
