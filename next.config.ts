import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
    reactCompiler: {
      compilationMode: "annotation",
    },
  },
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
