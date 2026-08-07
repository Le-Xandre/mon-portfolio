/** @type {import('next').NextConfig} */

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,

  // Configuration spécifique à GitHub Pages
  ...(isGithubPages && {
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),

  // Configuration des images
  images: {
    formats: ["image/avif", "image/webp"],

    /*
     * Décommente uniquement si tu utilises
     * des images hébergées à l'extérieur.
     *
     * remotePatterns: [
     *   {
     *     protocol: "https",
     *     hostname: "live.staticflickr.com",
     *   },
     *   {
     *     protocol: "https",
     *     hostname: "i.ytimg.com",
     *   },
     *   {
     *     protocol: "https",
     *     hostname: "images.unsplash.com",
     *   },
     * ],
     */
  },

  // Support des fichiers SVG en composants React
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
