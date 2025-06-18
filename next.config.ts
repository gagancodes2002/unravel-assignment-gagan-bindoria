import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1tf573zhz3zzy.cloudfront.net',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
