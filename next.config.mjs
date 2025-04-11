/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  eslint: {
    // Don't let ESLint errors stop production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't let TypeScript errors stop production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 