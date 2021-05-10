import Head from 'next/head';
import Layout from 'layout';

const News: React.FC<void> = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Themes page</title>
      </Head>
      Themes
    </Layout>
  );
};

export default News;
