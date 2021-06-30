import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from 'layout';

import ThemeSection from 'components/themes/section';
import ThemeHeader from 'components/themes/header';
import ThemeMobileFooter from 'components/themes/mobile-footer';

import themes from 'constants/themes';

const ThemePage: React.FC<void> = (): JSX.Element => {
  const router = useRouter();
  const { slug } = router.query;

  const theme = themes.find((t) => t.slug === slug);

  return (
    <Layout>
      <Head>
        <title>Theme page</title>
      </Head>

      {theme && (
        <>
          <ThemeHeader />

          {theme.sections &&
            theme.sections.map((section, index) => (
              <ThemeSection key={section.title} index={index + 1} section={section} />
            ))}
          <ThemeMobileFooter />
        </>
      )}
    </Layout>
  );
};

export default ThemePage;
