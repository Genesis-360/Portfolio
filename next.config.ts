import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  allowedDevOrigins: ["192.168.1.38", "127.0.0.1", "localhost"],
};

export default nextConfig;
