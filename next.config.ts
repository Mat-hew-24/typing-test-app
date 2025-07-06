import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://media.tenor.com/2BLI5EO7yVAAAAAm/loading-image.webp"),
    ],
  },
};

export default nextConfig;
