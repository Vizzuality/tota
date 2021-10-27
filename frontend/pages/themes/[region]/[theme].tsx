import React from 'react';
import Head from 'next/head';
import kebabCase from 'lodash/kebabCase';

import Layout from 'layout';

import ThemeMainHeader from 'components/themes/main-header';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import ThemeSections from 'components/themes/sections';
import ThemesNavbar from 'components/themes/navbar';

import { useRouterSelectedTheme } from 'hooks/themes';
import { useRegions } from 'hooks/regions';

import { dehydrate, QueryClient } from 'react-query';

import TotaAPI from 'services/api';
import themes from 'constants/themes';

export async function getStaticPaths() {
  const regions = await TotaAPI.get('/regions?filter[region_type]=province,tourism_region');

  // Get the paths we want to pre-render based on posts
  const paths = regions.flatMap((region) =>
    themes.map((theme) => ({
      params: {
        region: kebabCase(region.slug),
        theme: theme.slug,
      },
    })),
  );

  return { paths, fallback: false };
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('regions', () => TotaAPI.get('/regions?filter[region_type]=province,tourism_region'));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

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
