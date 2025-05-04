/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
    remotePatterns: [new URL('https://images.pexels.com/photos/1181271/**')],
  },
};

module.exports = nextConfig;