import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.31.180.159", "192.168.1.98"],
  images: {
    qualities: [75, 90],
  },
  experimental: {
    serverActions: {
      // Inquiry uploads go through /api/inquiry; keep a modest action limit.
      bodySizeLimit: "1mb",
      allowedOrigins: [
        "www.ozluotomotiv.com",
        "ozluotomotiv.com",
        "ozlu-otomotiv-web.vercel.app",
      ],
    },
  },
};

export default nextConfig;
