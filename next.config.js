/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
