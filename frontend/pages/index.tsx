import Head from 'next/head';

import Layout from 'layout';
import Button from 'components/button';
import Hero from 'components/hero';
import IndicatorLink from 'components/indicator-link';

import heroBackgroundImage from 'images/home/hero-background.png';

import { themesIndex as themes } from 'constants/themes';
import ParticipatingRegions from 'components/static-pages/participating-regions';
import GetInvolved from 'components/static-pages/get-involved';
import NewsletterSignUp from 'components/static-pages/newsletter-sign-up';

const Home: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Welcome to Tota</title>
      </Head>

      <Hero
        image={heroBackgroundImage}
        title={
          <>
            Welcome to the
            <br />
            British Columbia
            <br />
            Tourism Impact Portal
          </>
        }
        subtitle="A central place with tourism insights to guide well-informed decisions for a sustainable future"
        maxTextWidth={500}
        cta={
          <Button theme="primary-alt" className="w-48" href="/">
            Learn More
          </Button>
        }
      />

      <div className="container mx-auto lg:px-16">
        <div className="text-blue9 text-center py-24 mx-auto" style={{ maxWidth: 800 }}>
          <h4 className="text-2xl leading-normal">
            British Columbia is one of the most attractive tourism destinations worldwide. With this initiative, the
            participating regions within the province seek to strengthen their commitment towards more sustainable
            development.
          </h4>
          <p className="mt-10">Discover the committed regions and their tourism assets on the map.</p>
          <div className="mt-10">
            <Button theme="primary" className="w-48" href="/map">
              View Map
            </Button>
          </div>
        </div>

        <div className="text-blue9 text-center py-10 mx-auto">
          <h3 className="font-bold text-4xl leading-normal">Explore the data</h3>
          <p className="mt-10 mx-auto" style={{ maxWidth: 800 }}>
            This platform includes a variety of tourism-relevant information gathered from different sources across BC.
            It is an ever-evolving platform where data is regularly added to continuously extend the available economic,
            environmental and social insights and improve their spatial and temporal quality.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <IndicatorLink
                key={theme.slug}
                className="w-full"
                name={theme.title}
                url={`/themes/${theme.slug}`}
                image={theme.image}
              />
            ))}
            <div
              className="relative w-full border-2 border-blue9 text-blue9 text-2xl font-bold"
              style={{ paddingBottom: '100%' }}
            >
              <span className="absolute left-0 bottom-0 p-5 text-left">More coming soon...</span>
            </div>
          </div>
        </div>

        <ParticipatingRegions className="border-b border-gray3" />
        <GetInvolved className="border-b border-gray3" />
        <NewsletterSignUp />
      </div>
    </Layout>
  );
};

export default Home;
