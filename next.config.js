/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
