/** @type {import('@cloudflare/next-on-pages/type').Configuration} */
const config = {
  // Optional: Adjust to your specific requirements
  skipFinalBuild: false,
  // Optional: Ensure compatibility with your Next.js features
  compatibilityDate: "2024-09-23",
  compatibilityFlags: ["nodejs_compat"],
  // Advanced optimizations for mature deployments
  experimental: {
    disableExperimentalWarning: true,
  }
};

export default config;