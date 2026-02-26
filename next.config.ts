import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    globalNotFound: true,
  },
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/home/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
