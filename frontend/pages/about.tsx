import Head from 'next/head';
import Layout from 'layout';
import Hero from 'components/hero';

import heroBackgroundImage from 'images/about/hero-background.png';

const About: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>About page</title>
      </Head>

      <Hero
        image={heroBackgroundImage}
        title="About the initiative"
        subtitle="Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus
      auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
      />
    </Layout>
  );
};

export default About;
