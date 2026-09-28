import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.31.180.159"],
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
