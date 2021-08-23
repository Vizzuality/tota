import Head from 'next/head';
import Layout from 'layout';
import Hero from 'components/hero';

import Button from 'components/button';
import Input from 'components/forms/input';

import heroBackgroundImage from 'images/get-involved/hero-background.png';
import background1Image from 'images/get-involved/background1.png';
import background2Image from 'images/get-involved/background2.png';
import ParticipatingRegions from 'components/static-pages/participating-regions';

const GetInvolved: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full bg-gray0">
      <Head>
        <title>Get involved</title>
      </Head>

      <Hero
        image={heroBackgroundImage}
        title="Get involved"
        subtitle="Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus
      auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
      />

      <div className="container mx-auto lg:px-16">
        <div className="grid md:grid-cols-2 gap-10 xl:gap-20 mt-20 text-center">
          <div className="p-10 xl:p-20 bg-cover text-white" style={{ backgroundImage: `url(${background1Image})` }}>
            <h2 className="text-2xl">Suggest a story</h2>
            <p className="leading-7 mt-10">
              Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non
              metus.
            </p>
            <Button theme="primary" className="mt-16 px-10" href="/">
              Suggest a Story
            </Button>
          </div>
          <div className="p-10 xl:p-20 bg-cover text-white" style={{ backgroundImage: `url(${background2Image})` }}>
            <h2 className="text-2xl">Contribute data</h2>
            <p className="leading-7 mt-10">
              Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non
              metus.
            </p>
            <Button theme="primary" className="mt-16 px-10" href="/">
              Contribute data
            </Button>
          </div>
        </div>

        <div className="text-blue9 mt-10 xl:mt-20 py-24 px-10 text-center bg-white">
          <h2 className="text-4xl">Feedback & Questions</h2>

          <p className="mt-10">
            Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus.
          </p>

          <div className="mt-10 flex flex-col gap-10 justify-center items-center">
            <div className="w-full" style={{ maxWidth: 500 }}>
              <Input mode="underlined" placeholder="Enter your email" />
            </div>
            <div className="w-full" style={{ maxWidth: 500 }}>
              <Input mode="underlined" placeholder="Enter your message" />
            </div>
            <Button theme="secondary" className="w-48">
              Submit
            </Button>
          </div>
        </div>

        <ParticipatingRegions />
      </div>
    </Layout>
  );
};

export default GetInvolved;
