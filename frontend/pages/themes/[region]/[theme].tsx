import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'layout';

import ThemeSection from 'components/themes/section';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';
import ThemesNavbar from 'components/themes/navbar';

import themes from 'constants/themes';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { theme: themeSlug, region } = router.query;

  const theme = themes.find((t) => t.slug === themeSlug);

  return (
    <Layout>
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && (
        <>
          <ThemesNavbar />
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
