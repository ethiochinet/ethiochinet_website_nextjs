/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    //unoptimized: true, // For Firebase Hosting
    unoptimized: false, // Set to true only if you want static export
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional for development
  },
  typescript: {
    ignoreBuildErrors: true, // Optional for development
  },
}

module.exports = nextConfig