/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' - let Firebase handle SSR
  images: {
    domains: ['firebasestorage.googleapis.com'],
    // Enable optimization for SSR
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this for better SSR performance
  swcMinify: true,
}

module.exports = nextConfig