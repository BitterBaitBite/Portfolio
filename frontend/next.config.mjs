import { hostname } from "node:os";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // 1. Dev.to (Images and CDNs)
      {
        protocol: "https",
        hostname: "media2.dev.to",
      },
      {
        protocol: "https",
        hostname: "media.dev.to",
      },
      {
        protocol: "https",
        hostname: "dev-to-uploads.s3.us-east-2.amazonaws.com",
      },
      // 3. Current RSS Generic Servers
      {
        protocol: "https",
        hostname: "**.bleepingcomputer.com",
      },
      {
        protocol: "https",
        hostname: "**.gamedeveloper.com",
      },
      {
        protocol: "https",
        hostname: "**.contentstack.com",
      },
      {
        protocol: "https",
        hostname: "**.80.lv",
      },
    ],
  },
};

export default nextConfig;
