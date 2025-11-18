/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'aslifresh.nyc3.cdn.digitaloceanspaces.com',
      'api.aslifresh.com'
    ],
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig