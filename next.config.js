// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/mon-portfolio',
  assetPrefix: '/mon-portfolio/',
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath: '/mon-portfolio',
  },
};

module.exports = nextConfig;
