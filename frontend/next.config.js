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
    }
  }
);
