import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.31.180.159", "192.168.1.98"],
  images: {
    qualities: [75, 90],
  },
  experimental: {
    serverActions: {
      // Vercel rejects request bodies above 4.5 MB.
      bodySizeLimit: "4mb",
      allowedOrigins: [
        "www.ozluotomotiv.com",
        "ozluotomotiv.com",
        "ozlu-otomotiv-web.vercel.app",
      ],
    },
  },
};

export default nextConfig;
