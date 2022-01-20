import Head from 'next/head';

import Layout from 'layout';
import Button from 'components/button';
import Hero from 'components/hero';
import IndicatorLink from 'components/indicator-link';

import { useThemes } from 'hooks/themes';

import heroBackgroundImage1 from 'images/home/hero-background-1.png';
import heroBackgroundImage2 from 'images/home/hero-background-2.png';
import heroBackgroundImage3 from 'images/home/hero-background-3.png';
import heroBackgroundImage4 from 'images/home/hero-background-4.png';
import heroBackgroundImage5 from 'images/home/hero-background-5.png';

import boxComingSoonImage from 'images/home/box-more-coming-soon.png';

import ParticipatingRegions from 'components/static-pages/participating-regions';
import GetInvolved from 'components/static-pages/get-involved';
import NewsletterSignUp from 'components/static-pages/newsletter-sign-up';

const Home: React.FC<void> = (): JSX.Element => {
  const themesResult = useThemes();
  const themes = themesResult.data?.filter((t) => t.slug !== 'general_insights');
  const themesFetchedWithSuccess = themesResult.isFetched && themesResult.isSuccess;

  return (
    <Layout className="w-full">
      <Head>
        <title>Welcome to TOTA</title>
      </Head>

      <Hero
        images={[
          heroBackgroundImage1,
          heroBackgroundImage2,
          heroBackgroundImage3,
          heroBackgroundImage4,
          heroBackgroundImage5,
        ]}
        title={
          <>
            Welcome to the
            <br />
            Tourism Impact Portal
          </>
        }
        subtitle="A central place providing key insights about tourism development in the province to support well-informed decisions for a sustainable future."
        maxTextWidth={500}
        cta={
          <Button theme="primary-alt" className="w-48" href="/">
            Learn More
          </Button>
        }
      />

      <div className="container mx-auto lg:px-16">
        <div className="text-blue-800 text-center py-24 mx-auto" style={{ maxWidth: 800 }}>
          <h4 className="text-2xl leading-10">
            British Columbia is one of the most attractive destinations worldwide. With this initiative, the
            participating regions within the province seek to strengthen their commitment towards sustainable
            development through more transparent reporting and continuous monitoring of economic, environmental, and
            social impacts of tourism.
          </h4>
          <p className="mt-10 leading-7">Discover the committed regions and their tourism assets on the map.</p>
          <div className="mt-10">
            <Button theme="primary" className="w-48" href="/map">
              View Map
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white text-blue-800 text-center py-24 mx-auto">
        <div className="container mx-auto">
          <h3 className="font-bold text-4xl leading-normal">Explore the data</h3>
          <p className="mt-10 mx-auto leading-7" style={{ maxWidth: 800 }}>
            This platform includes a variety of tourism-relevant information gathered from different sources across BC.
            It is an ever-evolving platform where data is regularly added to continuously extend the available economic,
            environmental and social insights and improve their spatial and temporal quality.
          </p>

          {themesFetchedWithSuccess && (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => (
                <IndicatorLink
                  key={theme.slug}
                  className="w-full"
                  name={theme.title}
                  url={`/themes/british-columbia/${theme.slug}`}
                  image={theme.image}
                />
              ))}
              <div
                className="relative w-full text-white text-2xl font-bold bg-cover"
                style={{ backgroundImage: `url(${boxComingSoonImage})`, paddingBottom: '100%' }}
              >
                <span className="absolute left-0 bottom-0 p-5 text-left">More coming soon...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ParticipatingRegions className="container mx-auto" />
      <div className="bg-white">
        <GetInvolved className="container mx-auto" />
      </div>
      <NewsletterSignUp className="container mx-auto" />
    </Layout>
  );
};

export default Home;
