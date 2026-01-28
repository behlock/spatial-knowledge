const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Turbopack config (Next.js 16 default)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack config (fallback)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, 'src/assets/svg'),
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig;
