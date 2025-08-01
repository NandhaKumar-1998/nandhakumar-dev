import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'output: export' to enable ISR
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
