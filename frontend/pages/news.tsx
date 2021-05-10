import Head from 'next/head';
import Layout from 'layout';

const News: React.FC<void> = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>News page</title>
      </Head>
      News page
    </Layout>
  );
};

export default News;
