module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-control',
            value: 'max-age=31536000',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitalpress.fra1.cdn.digitaloceanspaces.com',
      },
    ],
    deviceSizes: [480, 828, 1200],
    imageSizes: [480, 828, 1200],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
}
