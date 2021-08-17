import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'layout';

import ThemeSection from 'components/themes/section';
import ThemeMainHeader from 'components/themes/main-header';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import ThemesNavbar from 'components/themes/navbar';

import themes from 'constants/themes';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { theme: themeSlug } = router.query;

  const theme = themes.find((t) => t.slug === themeSlug);

  return (
    <Layout className="w-full">
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && (
        <>
          <ThemeMainHeader />
          <ThemesNavbar />
          <div className="container mx-auto">
            <ThemeHeader />
            {theme?.sections?.map((section, index) => (
              <ThemeSection key={`${theme.slug} - ${section.title}`} index={index + 1} section={section} />
            ))}
            <ThemeMobileFooter />
          </div>
        </>
      )}
    </Layout>
  );
};

export default ThemePage;
