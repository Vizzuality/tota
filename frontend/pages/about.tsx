import Head from 'next/head';
import Layout from 'layout';

const About: React.FC<void> = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>About page</title>
      </Head>
      About page
    </Layout>
  );
};

export default About;
