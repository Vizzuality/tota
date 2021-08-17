import Head from 'next/head';
import Layout from 'layout';
import Hero from 'components/hero';

import heroBackgroundImage from 'images/home/hero-background.png';

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
      />
    </Layout>
  );
};

export default Home;
