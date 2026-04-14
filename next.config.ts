import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ✅ BEST (dynamic root)
  },
};

export default nextConfig;