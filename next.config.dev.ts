import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development configuration without static export
  images: {
    unoptimized: true
  }
};

export default nextConfig;