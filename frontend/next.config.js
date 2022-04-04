/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  [
    withBundleAnalyzer,
  ],
  {
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
    async rewrites() {
      const backend = process.env.NEXT_PUBLIC_TOTA_BACKEND_HOST;

      return [
        {
          source: '/:backend_path(admin|auth|assets|api|mini-profiler-resources|rails)/:path*',
          destination: `${backend}/:backend_path/:path*`,
        },
      ];
    },
  },
);
