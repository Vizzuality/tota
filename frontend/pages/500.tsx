import React from 'react';
import Head from 'next/head';

import Layout from 'layout';

const Custom500: React.FC = () => {
  return (
    <Layout className="w-full" navbarTheme="gray">
      <Head>
        <title>500 - Unexpected Error</title>
      </Head>

      <div className="flex flex-col md:flex-grow min-h-[500px] mt-24">
        <div className="flex items-center justify-center flex-1 py-10">
          <h1 className="text-2xl text-gray-500 font-heading">500 - Oops Something Went Wrong</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Custom500;
