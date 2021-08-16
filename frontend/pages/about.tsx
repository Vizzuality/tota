import Head from 'next/head';
import Layout from 'layout';

import heroBackgroundImage from 'images/about/hero-background.png';

const About: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>About page</title>
      </Head>

      <div
        className="w-full py-40 flex justify-center items-center bg-cover text-white"
        style={{ backgroundImage: `url(${heroBackgroundImage})`, height: 700 }}
      >
        <div className="text-center container">
          <h1 className="text-5xl font-semibold mb-3">About the initiative</h1>

          <p className="text-xl mt-20 mx-auto" style={{ maxWidth: 700 }}>
            Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus
            auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
