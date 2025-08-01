import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;