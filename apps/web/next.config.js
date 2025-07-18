/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@handcrafted-haven/ui',
    '@handcrafted-haven/types',
    '@handcrafted-haven/utils'
  ],
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  // Configure paths for monorepo
  webpack: (config, { isServer }) => {
    // Add any custom webpack configuration here
    return config;
  },
}

module.exports = nextConfig;
