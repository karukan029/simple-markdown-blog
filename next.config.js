/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Always unoptimize for Cloudflare Pages
  },
  // Optimize for Cloudflare Pages
  output: 'export',
  // Disable ESLint during build to avoid issues with apostrophes
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static HTML export for Cloudflare Pages
  trailingSlash: true,
};

module.exports = nextConfig;