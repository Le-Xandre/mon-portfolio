/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    // Formats optimisés
    formats: ["image/avif", "image/webp"],

    // Décommente uniquement si tu utilises réellement
    // des images distantes.
    /*
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    */
  },

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
