/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  [
    withOptimizedImages({
      optimizeImages: false,
    }),
    withBundleAnalyzer,
  ],
  {
    images: {
      disableStaticImages: true,
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
