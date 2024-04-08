/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,

  experimental: {
    esmExternals: "loose",

    optimizeFonts: true,
  },
};

module.exports = nextConfig;
