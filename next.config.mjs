// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  compiler: {
    // Removes console.log statements in production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;