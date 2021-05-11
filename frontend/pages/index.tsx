import Head from 'next/head';
import Layout from 'layout';

const Home: React.FC<void> = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Welcome to Tota</title>
      </Head>
    </Layout>
  );
};

export default Home;
