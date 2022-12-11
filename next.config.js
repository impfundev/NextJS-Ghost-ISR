module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitalpress.fra1.cdn.digitaloceanspaces.com',
      },
    ],
    deviceSizes: [480, 640, 760, 1080, 1200],
    imageSizes: [480, 640, 760, 1080, 1200],
    formats: ['image/avif', 'image/webp'],
  },
}
