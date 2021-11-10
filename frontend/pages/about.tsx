import Head from 'next/head';
import Layout from 'layout';
import Hero from 'components/hero';

import heroBackgroundImage from 'images/about/hero-background.png';
import ParticipatingRegions from 'components/static-pages/participating-regions';
import GetInvolved from 'components/static-pages/get-involved';
import NewsletterSignUp from 'components/static-pages/newsletter-sign-up';

const About: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>About page</title>
      </Head>

      <Hero image={heroBackgroundImage}>
        <div className="text-center container z-10">
          <h1 className="text-4xl md:text-5xl font-semibold md:mt-20 mb-3 leading-tight md:leading-tight">
            About the Initiative
          </h1>

          <p className="text-lg mt-10 leading-7 mx-auto" style={{ maxWidth: 1200 }}>
            The Tourism Impact Portal is a result of the ongoing efforts by the participating regions to ensure and
            foster sustainable tourism development in the province. Understanding the responsibility that tourism holds
            in safeguarding and strengthening healthy spaces for communities and visitors alike, the participating
            regions are committed to increase and improve the information landscape by facilitating access for all
            stakeholders to economic, environmental and social insights and creating more transparency overall.
          </p>
        </div>
      </Hero>

      <div className="container mx-auto lg:px-16 text-blue-800 py-24 text-center">
        <h3 className="text-4xl font-bold">Background</h3>

        <div className="leading-7 mt-14 mx-auto" style={{ maxWidth: 1200 }}>
          <p>
            With the continuously growing tourism numbers of the past decade, as well as the crisis derived from
            COVID-19, the tourism industry is now, more than ever before, in need of more precise and timely insights.
          </p>
          <p className="mt-4">
            At the same time, additional challenges such as the increasingly negative impacts of climate change and
            other threats to societies and the environment are increasingly impacting destinations, requiring even more
            reliable data to move away from intuition-based decision making towards more evidence-based decision-making
            that fosters a healthy and resilient environment for both host and guest.
          </p>
          <p className="mt-4">
            The purpose of this initiative is to provide tourism stakeholders a one-stop shop for all available data
            insights that is easily accessible and facilitates understanding of different tourism-related trends and
            dynamics in the regions. In addition, bringing all available data together in one central place will allow
            tourism operators and those responsible for planning and development to identify research gaps, better
            articulate data needs and make more powerful and responsible data-driven decisions that are key for a
            sustainable future of the province and its regions.
          </p>
        </div>
      </div>

      <div className="text-blue-800 py-24 text-center bg-yellow-50">
        <div className="container mx-auto lg:px-16">
          <h3 className="text-4xl font-bold">Why a central data portal?</h3>

          <p className="mt-10 leading-7">
            Tourism destinations around the world are moving away from primarily marketing-driven tourism development
            towards more management-oriented approaches, where the measures of success are more and more related to the
            net benefits for local communities instead of predominantly economic key performance indicators such as
            revenues and volumes of visitor arrivals.
          </p>

          <p className="mt-10 leading-7">
            For this shift to occur, reliable and timely data about the economic, environmental, and social impacts of
            tourism are needed. However, due to the unique realities in destinations, as well as the complexity of the
            tourism value chain with its many different stakeholders and linkages with other sectors, this task presents
            enormous challenges as information tends to be located in many different organizations and in different
            formats. At the same time, available data is often not available in a regular and timely manner, gathered
            with different methodologies and coming from different data sources. As a result, it tends to be enormously
            difficult for tourism stakeholder to understand what kind of reliable information is available, who are the
            responsible entities to connect with, what is the quality of information, what are the sharing rights, what
            are efficient ways to integrate information in existing processes for decision-making. As this scattered
            landscape makes it extremely difficult to identify data gaps and observe and understand development trends,
            hence presenting in a certain way a barrier to responsible and sustainable development, this initiative
            seeks to minimize some of those challenges.
          </p>
        </div>
      </div>

      <div className="container mx-auto lg:px-16">
        <ParticipatingRegions />
      </div>

      <div className="text-blue-800 bg-yellow-50 py-24 text-center">
        <div className="container mx-auto lg:px-16">
          <h3 className="text-4xl font-bold">Objectives behind the data portal</h3>

          <p className="mt-10 leading-7">
            The Tourism Impact Portal seeks to contribute to an open, data-driven culture within the tourism sector in
            BC, where businesses and other stakeholders responsible for the planning and development of destinations can
            use more reliable evidence for their decision-making. Its purpose is to foster a transparent information
            landscape with a wide variety of data beyond the traditional economic insights, as well as encourage more
            open data sharing and initiate dialogues about data that empower stakeholders to make decisions for a
            sustainable future.
          </p>

          <div className="inline-block text-left">
            <p className="mt-10 leading-7">In detail, the Impact Portal aims to:</p>

            <ul className="mt-2 list-disc list-inside">
              <li>Make it easier and faster to find information</li>
              <li>Provide more information for the regional, destination level</li>
              <li>Facilitate better understanding of data and complex tourism dynamics</li>
              <li>Reduce silos between departments/organizations & (sub)sectors</li>
              <li>Support efforts to reduce data gaps and improve the quality of available data</li>
              <li>Extend data insights beyond economic information</li>
              <li>Encourage more regular and continuous data collection</li>
              <li>Foster more alignment & standardization of data</li>
              <li>Encourage stakeholders to lean on data</li>
              <li>Improve the ability to benchmark and analyze data</li>
              <li>Increase collaboration & commitments to data sharing</li>
              <li>Foster regular data inquiries & research</li>
              <li>Improve monitoring and reporting of actions and progress</li>
              <li>Support stakeholders to prioritize efforts and optimize operations</li>
            </ul>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 text-center mt-10">
            <div className="p-10 bg-white text-2xl">
              <h4>Who is the portal for?</h4>
              <p className="text-lg mt-10 leading-7">
                The Tourism Impact Portal has been designed for all stakeholders in the province that are responsible
                for, or simply interested in, the development of tourism in the regions. This includes private
                businesses, government and other public entities, industry associations, educational institutions, local
                communities, and others.
              </p>
            </div>
            <div className="p-10 bg-white text-2xl">
              <h4>Data for a sustainable future </h4>
              <p className="text-lg mt-10 leading-7">
                For sustainable development, it is important to understand current and past dynamics, as well as
                processes undertaken so far, in order to set responsible development objectives for the future. By
                facilitating access to information and improving the availability and quality of information, the
                tourism stakeholders of the regions also contribute to the achievement of sustainability goals set by
                the global community such as the UN Sustainable Development Goals and the climate ambitions of the Paris
                Agreement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto lg:px-16">
        <GetInvolved className="border-b border-gray-300" />
        <NewsletterSignUp />
      </div>
    </Layout>
  );
};

export default About;
