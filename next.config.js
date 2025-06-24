/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['yourdomain.com'], // ← ajoute ici les domaines autorisés si tu charges des images distantes
        formats: ['image/webp', 'image/avif'], // optimisation automatique
    },
    experimental: {
        scrollRestoration: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

module.exports = nextConfig;
