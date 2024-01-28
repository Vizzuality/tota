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
        <title>{title} | Tourism Impact Portal</title>
      </Head>
      <div className="print:hidden">
        <ThemeMainHeader />
        <ThemesNavbar />
      </div>
      <div className="sm:container sm:mx-auto print:!-ml-8">
        {dataReady && (
          <>
            <div>
              <ThemeHeader />
            </div>
            {theme.slug === 'additional_resources' ? <AdditionalResources /> : <ThemeWidgets />}
            <div className="print:hidden">
              <ThemeMobileFooter />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ThemePage;
