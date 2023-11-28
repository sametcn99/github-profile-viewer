module.exports = {
    async headers() {
        return [
            {
                source: '/api/:path*', // /api altındaki tüm rotaları belirtin
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store', // Önbelleklemeyi devre dışı bırakır
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
    productionBrowserSourceMaps: true,
};
