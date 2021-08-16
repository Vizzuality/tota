import Head from 'next/head';
import Layout from 'layout';

import heroBackgroundImage from 'images/home/hero-background.png';

const Home: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Welcome to Tota</title>
      </Head>

      <div
        className="w-full py-40 flex justify-center items-center bg-cover text-white"
        style={{ backgroundImage: `url(${heroBackgroundImage})`, height: 700 }}
      >
        <div className="text-center container">
          <h1 className="text-5xl font-semibold mb-3">
            Welcome to the
            <br />
            British Columbia
            <br />
            Tourism Impact Portal
          </h1>

          <p className="text-xl mt-20 mx-auto" style={{ maxWidth: 700 }}>
            A central place with tourism insights to guide well-informed decisions for a sustainable future
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
