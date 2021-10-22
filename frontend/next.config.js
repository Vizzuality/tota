/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};

module.exports = withPlugins(
  [
    withOptimizedImages({
      optimizeImages: false,
    }),
    withBundleAnalyzer
  ],
  nextConfig,
);
