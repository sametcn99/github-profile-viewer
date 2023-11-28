/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
    productionBrowserSourceMaps: true,

}

module.exports = nextConfig