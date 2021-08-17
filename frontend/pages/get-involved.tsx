import Head from 'next/head';
import Layout from 'layout';
import Hero from 'components/hero';

import heroBackgroundImage from 'images/get-involved/hero-background.png';

const GetInvolved: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Get involved</title>
      </Head>

      <Hero
        image={heroBackgroundImage}
        title="Get involved"
        subtitle="Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus
      auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
      />
    </Layout>
  );
};

export default GetInvolved;
