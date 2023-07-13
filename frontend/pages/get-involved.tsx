import Head from 'next/head';
import Image from 'next/image';

import Layout from 'layout';

import Hero from 'components/hero';
import Button from 'components/button';
import Input from 'components/forms/input';

import heroBackgroundImage from 'images/get-involved/hero-background.png';
import background1Image from 'images/get-involved/background1.png';
import background2Image from 'images/get-involved/background2.png';
import ParticipatingRegions from 'components/static-pages/participating-regions';

import { SUGGEST_STORY_FORM_URL, CONTRIBUTE_DATA_FORM_URL } from 'constants/links';

const GetInvolved: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Get involved | British Columbia Regional Tourism Secretariat (BCRTS)</title>
      </Head>

      <Hero
        image={heroBackgroundImage}
        title="Get involved"
        subtitle="With the BC Tourism Impact Portal, the participating regions want to strengthen an open data culture, where information sharing and joint data efforts form the basis for better decision making and thus tourism planning overall. To ensure sustainable tourism development in the future, this is our collective responsibility, so join the ride by contributing through the following ways:"
      />

      <div className="container mx-auto lg:px-16">
        <div className="grid md:grid-cols-2 gap-10 xl:gap-20 mt-20 text-center">
          <div className="p-10 xl:p-16 text-white relative">
            <Image src={background1Image} layout="fill" objectFit="cover" objectPosition="center" quality={100} />
            <div className="relative">
              <h2 className="text-2xl">Suggest a story</h2>
              <p className="leading-7 mt-10">
                See a connection or insight in the data worth exploring? Let us know about it. We might craft a story
                around the lead you sent in the future and extend insights thanks to those suggestions.
              </p>
              <Button theme="primary" className="mt-10 px-10 uppercase" href={SUGGEST_STORY_FORM_URL}>
                Suggest a Story
              </Button>
            </div>
          </div>
          <div className="p-10 xl:p-16 text-white relative">
            <Image src={background2Image} layout="fill" objectFit="cover" objectPosition="center" quality={100} />
            <div className="relative">
              <h2 className="text-2xl">Contribute data</h2>
              <p className="leading-7 mt-10">
                Join the open data revolution. We’re committed to making data freely accessible to everyone. If you want
                to help us on this journey and have data you can share (data you collected, or a data set you know of on
                another platform), we want to hear from you*.
              </p>

              <Button theme="primary" className="mt-10 px-10 uppercase" href={CONTRIBUTE_DATA_FORM_URL}>
                Submit/Propose a data set
              </Button>
              <p className="text-xs mt-6">
                *Note: The proposed data will be reviewed carefully. Its inclusion will depend on several factors such
                as the overall quality, completeness, reliability, relevance and timeliness, among others. Based on
                these factors, the participating regions will decide if the information will be included on the portal
                or not.
              </p>
            </div>
          </div>
        </div>

        <div className="text-blue-800 mt-10 xl:mt-20 py-24 px-10 text-center bg-white">
          <h2 className="text-4xl">Feedback & Questions</h2>

          <p className="mt-10 leading-7">
            Would you like to share some feedback or do you have any questions for us? Write us:
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
