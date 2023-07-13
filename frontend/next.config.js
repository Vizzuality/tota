/* eslint-disable */

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    const redirects = [];

    if (process.env.WWW_TO_NON_WWW_REDIRECT === 'true' && process.env.NEXT_PUBLIC_TOTA_FRONTEND_HOSTNAME) {
      const hostname = process.env.NEXT_PUBLIC_TOTA_FRONTEND_HOSTNAME;
      redirects.push({
        source: '/:path*',
        has: [{ type: 'host', value: `www.${hostname}` }],
        destination: `https://${hostname}/:path*`,
        permanent: true
      })
    }

    return redirects;
  },
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_TOTA_BACKEND_HOST;

    return [
      {
        source: '/:backend_path(admin|auth|assets|api|mini-profiler-resources|rails)/:path*',
        destination: `${backend}/:backend_path/:path*`,
      },
    ];
  },
};
