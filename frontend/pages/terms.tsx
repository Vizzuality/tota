import Head from 'next/head';

import Layout from 'layout';
import Hero from 'components/hero';

const Terms: React.FC<void> = (): JSX.Element => {
  return (
    <Layout className="w-full">
      <Head>
        <title>Terms and conditions</title>
      </Head>

      <Hero className="bg-blue-800 text-white">
        <div className="text-center container z-10" style={{ maxWidth: 1200 }}>
          <h1 className="text-4xl md:text-5xl font-semibold md:mt-20 mb-3 leading-tight md:leading-tight">
            Disclaimer
          </h1>

          <p className="text-lg mt-10 leading-7 mx-auto">
            The conditions in this disclaimer apply to the website www.tourismimpactportal.com By visiting the Tourism
            Impact Portal and/or using the information provided via this Website, you agree to the applicability of this
            disclaimer. In the event of a conflict between the conditions for specific products and services ordered
            through this Website and this disclaimer, the conditions for these products and services will prevail.
          </p>
        </div>
      </Hero>

      <div className="py-24 text-center">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Use of the Tourism Impact Portal</h3>

          <p className="mt-10 leading-7">
            The information on this Website is intended for general information purposes only. No rights can be derived
            from the information on the Tourism Impact Portal. Although the British Columbia Regional Tourism
            Secretariat (BCRTS) takes care in compiling and maintaining this Website and uses sources that are
            considered to be reliable, the BCRTS cannot guarantee that the information provided is accurate, complete
            and up to date. The BCRTS also does not guarantee that the Website will function without errors or
            interruptions. The BCRTS explicitly rejects any liability with regard to the accuracy, completeness and
            current relevance of the information provided and the (uninterrupted) use of the Tourism Impact Portal.
          </p>
        </div>
      </div>

      <div className="text-white py-24 text-center bg-blue-800">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Third Party Information</h3>

          <p className="mt-10 leading-7">
            When the Tourism Impact Portal displays links to the websites of third parties, this does not mean that the
            BCRTS or any of the participating regions recommend the products or services offered on or through these
            Websites. The BCRTS accepts no liability and no responsibility for the content on, use of or availability of
            the websites that it refers to or that refer to the Tourism Impact Portal. The use of these links is
            entirely at the user’s own risk. The information on these websites has not been assessed by the BCRTS for
            accuracy, reasonableness, completeness or current relevance.
          </p>

          <p className="mt-10 leading-7">
            The BCRTS reserves all intellectual property rights and other rights with regard to all information offered
            on or via this Tourism Impact Portal, including, but not limited to, all trademarks, texts, graphic material
            and logos. It is not permitted to copy, download or in any way publish, distribute or reproduce information
            on this Website that is not made explicitly available for sharing.
          </p>
        </div>
      </div>

      <div className="py-24 text-center">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Changes</h3>

          <p className="mt-10 leading-7">
            The BCRTS and the participating regional DMOs reserve the right to change the information provided on or
            through this Tourism Impact Portal, including the text of this disclaimer, at any time without further
            notice. Users are advised to periodically check whether the information provided on or through this Website,
            including the text of this disclaimer, has been changed.
          </p>
        </div>
      </div>

      <div className="text-white py-24 text-center bg-blue-800">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Applicable Law</h3>

          <p className="mt-10 leading-7">
            The Tourism Impact Portal and the disclaimer are governed by Canadian law. Any disputes arising from or in
            connection with this disclaimer will be exclusively brought before the competent court in British Columbia,
            Canada.
          </p>
        </div>
      </div>

      <div className="py-24 text-center">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Responsible Disclosure</h3>

          <p className="mt-10 leading-7">
            It may happen that there is a vulnerability in the Tourism Impact Portal. If a security problem is
            encountered, we ask you to report it to the BCRTS as soon as possible via impactportal@totabc.com. This will
            enable the BCRTS to take appropriate measures. Make sure to leave your contact details (email or/and phone)
            so that we can get in touch with you to work together towards a safe solution.
          </p>
        </div>
      </div>

      <div className="text-white py-24 text-center bg-blue-800">
        <div className="container mx-auto lg:px-16" style={{ maxWidth: 1200 }}>
          <h3 className="text-4xl font-bold">Discovery of a Vulnerability</h3>

          <p className="mt-10 leading-7">
            To foster stronger and more open data cultures, the Tourism Impact Portal is built on an open-source
            solution. If any vulnerability is discovered, please do not misuse this knowledge, making changes to the
            system or any other kind of unethical and unlawful activities. If there are vulnerabilities discovered, we
            count on you to follow our request for responsible disclosure.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
