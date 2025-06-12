/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Obligatoire pour `npx next export`
  basePath: '/mon-portfolio', // correspond à ton repo GitHub
  trailingSlash: true, // important pour GitHub Pages
};

module.exports = nextConfig;
