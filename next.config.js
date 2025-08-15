/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async redirects() {
    return [
      // Add any redirects if needed
    ];
  },
  async rewrites() {
    return [
      // Add any rewrites if needed
    ];
  },
};

module.exports = nextConfig;
