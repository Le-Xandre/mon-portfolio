/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/mon-portfolio',
  assetPrefix: '/mon-portfolio/',
};

module.exports = nextConfig;
