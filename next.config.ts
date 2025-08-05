import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages (Static Export)
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  images: {
    unoptimized: true
  },
  distDir: 'out'
};

export default nextConfig;