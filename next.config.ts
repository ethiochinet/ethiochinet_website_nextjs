/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true, // For Firebase Hosting
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional for development
  },
  typescript: {
    ignoreBuildErrors: true, // Optional for development
  },
}

module.exports = nextConfig