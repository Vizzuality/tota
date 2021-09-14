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

      <Hero
        image={heroBackgroundImage}
        title="About the initiative"
        subtitle="Lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus
      auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
      />

      <div className="container mx-auto lg:px-16 text-blue-800 py-24 text-center">
        <h3 className="text-4xl font-bold">Background</h3>

        <p className="mt-10 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis nulla
          ultricies ex, in auctor nisi ligula a lacus. Aliquam non neque quis elit gravida pellentesque sit amet congue
          diam. Nulla orci purus, mattis non mi in, ullamcorper commodo libero. Curabitur ultrices felis sed est
          venenatis, at sollicitudin nisl posuere. Phasellus in bibendum dui. In in augue placerat, pulvinar sapien at,
          vulputate neque. In in ex sit amet eros commodo mollis. Nunc enim ex, porta non elit et, consectetur varius
          ipsum. Etiam sit amet ante a magna posuere imperdiet. Cras convallis posuere euismod. Etiam convallis neque at
          blandit dapibus. Donec tincidunt ante at metus molestie.
        </p>

        <p className="mt-10 leading-7">
          Mauris malesuada orci vitae mi dapibus, at porta eros efficitur. Donec gravida suscipit ex, quis scelerisque
          massa euismod non. Pellentesque viverra egestas lectus, a dignissim arcu finibus non. Pellentesque finibus
          felis efficitur vulputate dictum. Cras odio urna, laoreet at orci et, blandit efficitur velit. Etiam lobortis
          tempor odio, in laoreet magna lobortis id. Praesent nibh dui, pellentesque id est et, eleifend sollicitudin
          arcu. Pellentesque sed lorem maximus, laoreet risus in, feugiat ligula. Nunc consectetur, nulla sed auctor
          variu.
        </p>
      </div>

      <div className="text-blue-800 py-24 text-center bg-yellow-50">
        <div className="container mx-auto lg:px-16">
          <h3 className="text-4xl font-bold">What&apos;s the impact portal?</h3>

          <p className="mt-10 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis
            nulla ultricies ex, in auctor nisi ligula a lacus. Aliquam non neque quis elit gravida pellentesque sit amet
            congue diam. Nulla orci purus, mattis non mi in, ullamcorper commodo libero. Curabitur ultrices felis sed
            est venenatis, at sollicitudin nisl posuere. Phasellus in bibendum dui. In in augue placerat, pulvinar
            sapien at, vulputate neque. In in ex sit amet eros commodo mollis. Nunc enim ex, porta non elit et,
            consectetur varius ipsum. Etiam sit amet ante a magna posuere imperdiet. Cras convallis posuere euismod.
            Etiam convallis neque at blandit dapibus. Donec tincidunt ante at metus molestie.
          </p>
        </div>
      </div>
      <div className="container mx-auto lg:px-16">
        <ParticipatingRegions />
      </div>

      <div className="text-blue-800 bg-yellow-50 py-24 text-center">
        <div className="container mx-auto lg:px-16">
          <h3 className="text-4xl font-bold">Our mission</h3>

          <p className="mt-10 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis
            nulla ultricies ex, in auctor nisi ligula a lacus. Aliquam non neque quis elit gravida pellentesque sit amet
            congue diam. Nulla orci purus, mattis non mi in, ullamcorper commodo libero. Curabitur ultrices felis sed
            est venenatis, at sollicitudin nisl posuere. Phasellus in bibendum dui. In in augue placerat, pulvinar
            sapien at, vulputate neque. In in ex sit amet eros commodo mollis. Nunc enim ex, porta non elit et,
            consectetur varius ipsum. Etiam sit amet ante a magna posuere imperdiet. Cras convallis posuere euismod.
            Etiam convallis neque at blandit dapibus. Donec tincidunt ante at metus molestie.
          </p>

          <div className="grid lg:grid-cols-3 gap-10 text-center mt-10">
            <div className="p-10 bg-white text-2xl">
              <h4>Who is the portal for?</h4>
              <p className="text-lg mt-10 leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis
                nulla ultricies ex, in auctor nisi ligula a lacus.
              </p>
            </div>
            <div className="p-10 bg-white text-2xl">
              <h4>Data for a better future</h4>
              <p className="text-lg mt-10 leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis
                nulla ultricies ex, in auctor nisi ligula a lacus.
              </p>
            </div>
            <div className="p-10 bg-white text-2xl">
              <h4>Creating evidence</h4>
              <p className="text-lg mt-10 leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum, ex ut congue egestas, turpis
                nulla ultricies ex, in auctor nisi ligula a lacus.
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
