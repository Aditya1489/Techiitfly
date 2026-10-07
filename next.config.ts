import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — generates pure HTML/CSS/JS with zero server runtime
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
