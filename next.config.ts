import type { NextConfig } from "next";

const nextConfig = {

  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // cache optimized images for 24 hours to reduce CPU load
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      {
        protocol: "https",
        hostname: "busan-public.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "1gamestopup.com",
      },
      {
        protocol: "https",
        hostname: "elitedias.com",
      }
    ],
  },
  serverExternalPackages: ["nodemailer"],
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  async headers() {
    return [
      // 1. Allow any origin to access the public API service routes
      {
        source: "/api/service/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Open to all
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key, idempotency-key" },
        ]
      },
      // 2. Lock down all other internal APIs to ONLY BlueBuff domain (and localhost for dev)
      {
        source: "/api/(?!service/).*", // Matches all /api/ routes EXCEPT /api/service/
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // Note: In a real strict environment without localhost, you'd hardcode https://bluebuff.in
          // Next.js handles CORS dynamically if omitted, but this explicitly restricts browsers enforcing CORS.
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://bluebuff.in" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ];
  }
};

export default nextConfig;
