import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — generates pure HTML/CSS/JS with zero server runtime
  output: "export",
  images: {
    unoptimized: true,
  },
  // Three.js / R3F transpilePackages
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
};

export default nextConfig;
