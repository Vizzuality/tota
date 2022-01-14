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
    withBundleAnalyzer
  ],
  {
    images: {
      disableStaticImages: true,
    },
    async rewrites() {
      const backend = process.env.NEXT_PUBLIC_TOTA_API.replace('/api/v1', '')

      return [
        {
          source: '/admin/:path*',
          destination: `${backend}/admin/:path*`
        },
        {
          source: '/auth/:path*',
          destination: `${backend}/auth/:path*`
        },
        {
          source: '/assets/:path*',
          destination: `${backend}/assets/:path*`
        },
        {
          source: '/api/:path*',
          destination: `${backend}/api/:path*`
        },
      ]
    }
  }
);
