import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from 'layout';
import SidebarLayout from 'layout/sidebar';

import ThemeSection from 'components/themes/section';
import ThemeHeader from 'components/themes/header';

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
          <SidebarLayout
            sidebar={
              <>
                <h2 className="text-4xl">Themes & Indicators</h2>

                <div className="flex flex-col gap-5 mt-10">
                  {themes.map((theme) => (
                    <Link key={theme.slug} href={`/themes/${theme.slug}`}>
                      <a className="border-2 border-black p-5">{theme.name}</a>
                    </Link>
                  ))}
                </div>
              </>
            }
            content={
              <>
                {theme.sections &&
                  theme.sections.map((section) => <ThemeSection key={section.name} section={section} />)}
              </>
            }
          />
        </>
      )}
    </Layout>
  );
};

export default ThemePage;
